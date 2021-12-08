import styles from '../styles/Map.module.css';
import { Delta7Icon, PerLakhIcon } from './snippets/Icons';
import StatisticDropdown from './StatisticDropdown';
import Tooltip from './Tooltip';

import initData from '../data.min.json';

import {
    MAP_META,
    MAP_TYPES,
    MAP_VIEWS,
    MAP_VIZS,
    MAP_STATISTICS,
    SPRING_CONFIG_NUMBERS,
    STATE_NAMES,
    STATISTIC_CONFIGS,
    UNKNOWN_DISTRICT_KEY,
    DATA_API_ROOT,
    API_REFRESH_INTERVAL,
    PRIMARY_STATISTICS,
} from '../constants';
import {
    formatNumber,
    getStatistic,
    retry,
    parseIndiaDate,
    fetcher,
    capitalize,
} from '../utils/commonFunctions';
import { addDays, formatISO, max } from 'date-fns';
import {
    ArrowLeftIcon,
    DotFillIcon,
    PinIcon,
    OrganizationIcon,
} from '@primer/octicons-react';
import classnames from 'classnames';
import equal from 'fast-deep-equal';
import produce from 'immer';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { animated, useSpring } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import { useSessionStorage, useWindowSize, useLocalStorage } from 'react-use';
import useStickySWR from '../hooks/useStickySWR';

import MapVisualizer from './MapVisualizer';

function MapExplorer({
    stateCode: mapCode = 'TT',
    data,
    mapView = MAP_VIEWS.DISTRICTS,
    setMapView,
    mapStatistic,
    setMapStatistic,
    regionHighlighted,
    setRegionHighlighted,
    noRegionHighlightedDistrictData,
    anchor,
    setAnchor,
    expandTable = false,
    lastDataDate,
    hideDistrictData = false,
    hideDistrictTestData = true,
    hideVaccinated = false,
    noDistrictData = false,
}) {
    const mapExplorerRef = useRef();
    const { width } = useWindowSize();

    const [isPerLakh, setIsPerLakh] = useSessionStorage('isPerLakhMap', false);
    const [delta7Mode, setDelta7Mode] = useSessionStorage(
        'delta7ModeMap',
        false,
    );

    const mapMeta = MAP_META[mapCode];
    const mapData =
        mapMeta.mapType === MAP_TYPES.COUNTRY
            ? data
            : { [mapCode]: data[mapCode] };

    const statisticConfig = STATISTIC_CONFIGS[mapStatistic];

    const isDistrictView =
        mapView === MAP_VIEWS.DISTRICTS &&
        (mapMeta.mapType === MAP_TYPES.STATE ||
            (!hideDistrictData &&
                !(
                    hideDistrictTestData &&
                    statisticConfig?.category === 'tested'
                )));

    const hoveredRegion = useMemo(() => {
        const hoveredData =
            (regionHighlighted.districtName
                ? data[regionHighlighted.stateCode]?.districts?.[
                      regionHighlighted.districtName
                  ]
                : data[regionHighlighted.stateCode]) || {};

        return produce(hoveredData, (draft) => {
            draft.name =
                regionHighlighted.districtName ||
                STATE_NAMES[regionHighlighted.stateCode];
        });
    }, [data, regionHighlighted.stateCode, regionHighlighted.districtName]);

    const handlePerLakhClick = useCallback(() => {
        const statisticConfig = STATISTIC_CONFIGS[mapStatistic];
        if (statisticConfig?.nonLinear || mapStatistic === 'population') {
            return;
        }
        setIsPerLakh((isPerLakh) => !isPerLakh);
    }, [mapStatistic, setIsPerLakh]);

    const handleDistrictClick = useCallback(() => {
        const newMapView =
            mapView === MAP_VIEWS.DISTRICTS
                ? MAP_VIEWS.STATES
                : MAP_VIEWS.DISTRICTS;
        if (newMapView === MAP_VIEWS.STATES) {
            setRegionHighlighted({
                stateCode: regionHighlighted.stateCode,
                districtName: null,
            });
        }
        setMapView(newMapView);
    }, [
        mapView,
        regionHighlighted.stateCode,
        setMapView,
        setRegionHighlighted,
    ]);

    const history = useRouter();
    const panelRef = useRef();

    const trail = useMemo(() => {
        const styles = [];

        [0, 0, 0, 0, 0, 0, 0].map((element, index) => {
            styles.push({
                animationDelay: `${index * 250}ms`,
            });
            return null;
        });

        return styles;
    }, []);

    const getMapStatistic = useCallback(
        (data) => {
            const statisticConfig = STATISTIC_CONFIGS[mapStatistic];

            const type =
                (statisticConfig?.showDelta && delta7Mode) ||
                statisticConfig?.onlyDelta7
                    ? 'delta7'
                    : 'total';

            return getStatistic(data, type, mapStatistic, {
                expiredDate: lastDataDate,
                normalizedByPopulationPer:
                    isPerLakh && mapStatistic != 'population' ? 'lakh' : null,
                canBeNaN: true,
            });
        },
        [mapStatistic, isPerLakh, lastDataDate, delta7Mode],
    );

    let currentVal = getMapStatistic(hoveredRegion);
    if (isNaN(currentVal)) {
        currentVal = '-';
    }

    const spring = useSpring({
        total: currentVal,
        config: { tension: 250, ...SPRING_CONFIG_NUMBERS },
    });

    const mapStatistics = useMemo(
        () =>
            MAP_STATISTICS.filter(
                (statistic) =>
                    !(
                        STATISTIC_CONFIGS[statistic]?.category === 'vaccinated'
                    ) || !hideVaccinated,
            ),
        [hideVaccinated],
    );

    const handleStatisticChange = useCallback(
        (direction) => {
            const currentIndex = mapStatistics.indexOf(mapStatistic);
            const toIndex =
                (mapStatistics.length + currentIndex + direction) %
                mapStatistics.length;
            setMapStatistic(mapStatistics[toIndex]);
        },
        [mapStatistic, mapStatistics, setMapStatistic],
    );

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleStatisticChange.bind(this, 1),
        onSwipedRight: handleStatisticChange.bind(this, -1),
    });

    const mapViz = statisticConfig?.mapConfig?.spike
        ? MAP_VIZS.SPIKE
        : isPerLakh ||
          statisticConfig?.mapConfig?.colorScale ||
          statisticConfig?.nonLinear
        ? MAP_VIZS.CHOROPLETH
        : MAP_VIZS.BUBBLE;

    const handleDeltaClick = useCallback(() => {
        if (statisticConfig?.showDelta) {
            setDelta7Mode((delta7Mode) => !delta7Mode);
        }
    }, [statisticConfig, setDelta7Mode]);

    const stickied = anchor === 'mapexplorer' || (expandTable && width >= 769);

    const transformStatistic = useCallback(
        (val) =>
            statisticConfig?.mapConfig?.transformFn
                ? statisticConfig.mapConfig.transformFn(val)
                : val,
        [statisticConfig],
    );

    const zoneColor = statisticConfig?.mapConfig?.colorScale
        ? statisticConfig.mapConfig.colorScale(transformStatistic(currentVal))
        : '';

    return (
        <div
            className={classnames(
                'MapExplorer',
                { stickied },
                {
                    hidden:
                        anchor &&
                        anchor !== 'mapexplorer' &&
                        (!expandTable || width < 769),
                },
            )}
        >
            <div
                // className={classnames('anchor', 'fadeInUp', {
                //     stickied,
                // })}
                style={{
                    display: 'none',
                }}
                onClick={
                    setAnchor &&
                    setAnchor.bind(
                        this,
                        anchor === 'mapexplorer' ? null : 'mapexplorer',
                    )
                }
            >
                <PinIcon />
            </div>
            <div className='panel' ref={panelRef}>
                <div className='panel-left fadeInUp' style={trail[0]}>
                    <h2
                        // className={classnames(mapStatistic)}
                        className='subheading-text'
                        style={{
                            color: zoneColor || statisticConfig?.color,
                        }}
                    >
                        {hoveredRegion.name}
                        {hoveredRegion.name === UNKNOWN_DISTRICT_KEY &&
                            ` [${STATE_NAMES[regionHighlighted.stateCode]}]`}
                    </h2>

                    {regionHighlighted.stateCode && (
                        <h1
                            className={`${classnames(
                                'district',
                                mapStatistic,
                            )} normal-text`}
                            style={{
                                color: zoneColor || statisticConfig?.color,
                            }}
                        >
                            <animated.div>
                                {spring.total.to((total) =>
                                    !noRegionHighlightedDistrictData ||
                                    !statisticConfig?.hasPrimary
                                        ? formatNumber(
                                              total,
                                              statisticConfig.format,
                                              mapStatistic,
                                          )
                                        : '-',
                                )}
                            </animated.div>
                            <StatisticDropdown
                                currentStatistic={mapStatistic}
                                statistics={mapStatistics}
                                mapType={mapMeta.mapType}
                                {...{
                                    isPerLakh,
                                    delta7Mode,
                                    mapStatistic,
                                    setMapStatistic,
                                    hideDistrictTestData,
                                    hideVaccinated,
                                    zoneColor,
                                }}
                            />
                        </h1>
                    )}
                </div>

                <div
                    className={classnames('panel-right', `is-${mapStatistic}`)}
                >
                    <div className='switch-type'>
                        <Tooltip message={'Last 7 day values'} hold>
                            <div
                                className={classnames('toggle', 'fadeInUp', {
                                    'is-highlighted':
                                        (delta7Mode &&
                                            statisticConfig?.showDelta) ||
                                        statisticConfig?.onlyDelta7,
                                    disabled: !statisticConfig?.showDelta,
                                })}
                                onClick={handleDeltaClick}
                                style={trail[1]}
                            >
                                <Delta7Icon />
                            </div>
                        </Tooltip>

                        <Tooltip message={'Per lakh people'} hold>
                            <div
                                className={classnames('toggle', 'fadeInUp', {
                                    'is-highlighted':
                                        !statisticConfig?.nonLinear &&
                                        mapViz === MAP_VIZS.CHOROPLETH,
                                    disabled:
                                        statisticConfig?.nonLinear ||
                                        mapStatistic === 'population',
                                })}
                                onClick={handlePerLakhClick}
                                style={trail[2]}
                            >
                                <PerLakhIcon />
                            </div>
                        </Tooltip>

                        {mapMeta.mapType === MAP_TYPES.COUNTRY && (
                            <Tooltip
                                message={'Toggle between states/districts'}
                                hold
                            >
                                <div
                                    className={classnames(
                                        'toggle',
                                        'boundary fadeInUp',
                                        {
                                            'is-highlighted': isDistrictView,
                                            disabled:
                                                hideDistrictData ||
                                                (statisticConfig?.category ===
                                                    'tested' &&
                                                    hideDistrictTestData),
                                        },
                                    )}
                                    onClick={handleDistrictClick}
                                    style={trail[3]}
                                >
                                    <OrganizationIcon />
                                </div>
                            </Tooltip>
                        )}
                    </div>

                    <div className='switch-statistic fadeInUp' style={trail[5]}>
                        {mapStatistics.map((statistic) => (
                            <Tooltip
                                message={capitalize(statistic)}
                                key={statistic}
                            >
                                <div
                                    className={classnames(
                                        'toggle',
                                        'statistic-option',
                                        `is-${statistic}`,
                                        {
                                            'is-highlighted':
                                                mapStatistic === statistic,
                                        },
                                    )}
                                    onClick={setMapStatistic.bind(
                                        this,
                                        statistic,
                                    )}
                                >
                                    <DotFillIcon />
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={mapExplorerRef}
                className='fadeInUp'
                style={trail[3]}
                {...swipeHandlers}
            >
                {mapStatistic && (
                    <MapVisualizer
                        data={mapData}
                        statistic={mapStatistic}
                        {...{
                            mapCode,
                            isDistrictView,
                            mapViz,
                            regionHighlighted,
                            setRegionHighlighted,
                            getMapStatistic,
                            transformStatistic,
                            noDistrictData,
                        }}
                    ></MapVisualizer>
                )}
            </div>
        </div>
    );
}

const isEqual = (prevProps, currProps) => {
    if (!equal(prevProps.stateCode, currProps.stateCode)) {
        return false;
    } else if (
        !equal(prevProps.regionHighlighted, currProps.regionHighlighted)
    ) {
        return false;
    } else if (!equal(prevProps.mapView, currProps.mapView)) {
        return false;
    } else if (!equal(prevProps.mapStatistic, currProps.mapStatistic)) {
        return false;
    } else if (!equal(prevProps.anchor, currProps.anchor)) {
        return false;
    } else if (!equal(prevProps.expandTable, currProps.expandTable)) {
        return false;
    } else if (!equal(prevProps.hideDistrictData, currProps.hideDistrictData)) {
        return false;
    } else if (
        !equal(prevProps.hideDistrictTestData, currProps.hideDistrictTestData)
    ) {
        return false;
    } else if (!equal(prevProps.hideVaccinated, currProps.hideVaccinated)) {
        return false;
    } else if (!equal(prevProps.lastDataDate, currProps.lastDataDate)) {
        return false;
    } else if (
        !equal(
            prevProps.data?.TT?.meta?.['last_updated'],
            currProps.data?.TT?.meta?.['last_updated'],
        )
    ) {
        return false;
    } else if (!equal(prevProps.data?.TT?.total, currProps.data?.TT?.total)) {
        return false;
    } else if (
        !equal(
            prevProps.noRegionHighlightedDistrictData,
            currProps.noRegionHighlightedDistrictData,
        )
    ) {
        return false;
    } else if (!equal(prevProps.noDistrictData, currProps.noDistrictData)) {
        return false;
    }
    return true;
};

const Map = () => {
    const [date, setDate] = useState('');
    const [data, setData] = useState(initData);

    const lastDataDate = useMemo(() => {
        const updatedDates = [
            data?.['TT']?.meta?.date,
            data?.['TT']?.meta?.tested?.date,
            data?.['TT']?.meta?.vaccinated?.date,
        ].filter((date) => date);
        return updatedDates.length > 0
            ? formatISO(max(updatedDates.map((date) => parseIndiaDate(date))), {
                  representation: 'date',
              })
            : null;
    }, [data]);

    const hideDistrictData = date !== '' && date < DISTRICT_START_DATE;
    const hideDistrictTestData =
        date === '' ||
        date >
            formatISO(
                addDays(
                    parseIndiaDate(DISTRICT_TEST_END_DATE),
                    TESTED_EXPIRING_DAYS,
                ),
                { representation: 'date' },
            );
    const hideVaccinated =
        getStatistic(data?.['TT'], 'total', 'vaccinated') === 0;

    const [mapStatistic, setMapStatistic] = useSessionStorage(
        'mapStatistic',
        'active',
    );
    const [mapView, setMapView] = useLocalStorage(
        'mapView',
        MAP_VIEWS.DISTRICTS,
    );
    const [regionHighlighted, setRegionHighlighted] = useState({
        stateCode: 'TT',
        districtName: null,
    });
    const [anchor, setAnchor] = useLocalStorage('anchor', null);
    const [expandTable, setExpandTable] = useLocalStorage('expandTable', false);

    const noDistrictDataStates = useMemo(
        () =>
            // Heuristic: All cases are in Unknown
            Object.entries(data || {}).reduce((res, [stateCode, stateData]) => {
                res[stateCode] = !!(
                    stateData?.districts &&
                    stateData.districts?.[UNKNOWN_DISTRICT_KEY] &&
                    PRIMARY_STATISTICS.every(
                        (statistic) =>
                            getStatistic(stateData, 'total', statistic) ===
                            getStatistic(
                                stateData.districts[UNKNOWN_DISTRICT_KEY],
                                'total',
                                statistic,
                            ),
                    )
                );
                return res;
            }, {}),
        [data],
    );

    const noRegionHighlightedDistrictData =
        regionHighlighted?.stateCode &&
        regionHighlighted?.districtName &&
        regionHighlighted.districtName !== UNKNOWN_DISTRICT_KEY &&
        noDistrictDataStates[regionHighlighted.stateCode];

    return (
        <div className={`${styles.map}`}>
            <header>
                <p className='foreground-primary'>
                    Last Updated on 01 Nov, 11:20 AM IST
                </p>
            </header>
            <div className={`${styles.mapFigure} w-100`}>
                <MapExplorer
                    {...{
                        stateCode: 'TT',
                        data,
                        mapStatistic,
                        setMapStatistic,
                        mapView,
                        setMapView,
                        regionHighlighted,
                        setRegionHighlighted,
                        anchor,
                        setAnchor,
                        expandTable,
                        lastDataDate,
                        hideDistrictData,
                        hideDistrictTestData,
                        hideVaccinated,
                        noRegionHighlightedDistrictData,
                    }}
                />
            </div>
        </div>
    );
};

export default memo(Map, isEqual);
