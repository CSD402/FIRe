import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import useScript from '../hooks/useScript';

import CustomerCarePopup from '../components/CustomerCarePopup';
import CustomBackground from '../components/CustomBackground';
import Map from '../components/Map';

import styles from '../styles/Home.module.css';

const LoggedOutHome = () => {
    return (
        <div className={styles.direction}>
            <Image
                src='/images/shield.png'
                height={250}
                width={250}
                alt='Shield'
            />
            <h1 className='heading-text foreground-white center-text'>
                How can we help you?
            </h1>
            <a
                href='/police/login'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                POLICE
            </a>
            <a
                href='/citizen/login'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                CITIZEN
            </a>
        </div>
    );
};

const CitizenHome = () => {
    let { client_data } = useStoreState((store) => store.accountModel);

    return (
        <>
            <Head>
                <title>FIRe | Citizen Home</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div className={styles.direction}>
                <Image
                    src='/images/shield.png'
                    height={175}
                    width={175}
                    alt='Shield'
                />
                <h1 className='heading-text foreground-white center-text'>
                    Welcome, {client_data.name}
                </h1>
                <a
                    href='/citizen/file-complaint'
                    className='btn-pulse border-radius-10 background-primary foreground-white'
                >
                    File Complaint
                </a>
                {/* <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                    Customer Care
                </button> */}
                <CustomerCarePopup />
                <a
                    href='/citizen/past-complaints'
                    className='btn-pulse border-radius-10 background-primary foreground-white'
                >
                    Past Complaints
                </a>
            </div>
        </>
    );
};

const SectionButton = ({ heading, data, button }) => {
    return button ? (
        <Link href='https://fire-data-vis.vercel.app/'>
            <a
                className={`${styles.sectionButton} ${styles.sectionLink} w-100`}
                target='_blank'
            >
                <h1 className='heading-text foreground-dark center-text'>
                    {heading}
                </h1>
                <div
                    className={`heading-text background-primary foreground-white border-radius-15 center-text ${styles.sectionData}`}
                >
                    {data}
                </div>
            </a>
        </Link>
    ) : (
        <div className={`${styles.sectionButton} w-45`}>
            <h1 className='heading-text foreground-dark center-text'>
                {heading}
            </h1>
            <div
                className={`heading-text background-primary foreground-white border-radius-15 center-text ${styles.sectionData}`}
            >
                {data}
            </div>
        </div>
    );
};

const PoliceHome = () => {
    let { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const [monthFirs, setMonthsFirs] = useState(269);

    const getFirCount = async () => {
        toggleLoader(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/complaint/count`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (r) => {
                const response = await r.json();
                setMonthsFirs(response);
            })
            .catch((e) => console.log(e))
            .finally(() => toggleLoader(false));
    };

    useEffect(() => {
        getFirCount();
    }, []);

    return (
        <>
            <Head>
                <title>FIRe | Police Official Home</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div
                className={`${styles.policeHome} background-white-translucent glass-effect border-radius-15`}
            >
                <div className={`${styles.policeIntro}`}>
                    <h1 className='heading-text foreground-dark'>
                        Welcome, {'Rakesh Kumar'}
                    </h1>
                    <h1 className='subheading-text foreground-dark'>
                        {'Sub-Inspector'}
                    </h1>
                </div>
                <div className={`${styles.policeSections}`}>
                    <SectionButton
                        heading='Active FIRS'
                        data={<span>6723</span>}
                    />
                    <SectionButton
                        heading='FIRs this month'
                        data={<span>{monthFirs}</span>}
                    />
                    <SectionButton
                        heading='Data Analytics'
                        data={
                            <Image
                                src='/images/chart.png'
                                height={325}
                                width={525}
                                alt='DATA'
                            />
                        }
                        button={true}
                    />
                </div>
                <a
                    href='/police/review-complaints'
                    className={`submit-button dark heading-text w-75 border-radius-15 ${styles.policeHomeButton}`}
                >
                    REVIEW COMPLAINTS
                </a>
            </div>
        </>
    );
};

const Home = () => {
    useScript(`${process.env.NEXT_PUBLIC_API}/translate`);

    const loginType = useStoreState((store) => store.accountModel.type);
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const googleTranslateElementInit = async () => {
        /* eslint-disable no-new */
        await new window.google.translate.TranslateElement(
            {
                pageLanguage: 'en',
                layout: window.google.translate.TranslateElement.FloatPosition
                    .TOP_LEFT,
            },
            'google_translate_element',
        );
        toggleLoader(false);
    };

    useEffect(() => {
        toggleLoader(true);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <>
            <Head>
                <title>FIRe | Home</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div id={styles.home}>
                {loginType === 1 ? (
                    <CitizenHome />
                ) : loginType === 2 ? (
                    <CustomBackground>
                        <PoliceHome />
                    </CustomBackground>
                ) : (
                    <LoggedOutHome />
                )}
                {loginType === 2 ? <></> : <Map />}
            </div>
        </>
    );
};

export default Home;
