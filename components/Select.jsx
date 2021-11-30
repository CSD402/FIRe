import { useState, useEffect } from 'react';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles/Select.module.css';

const Select = ({
    placeholder,
    values,
    defaultValue,
    classNames,
    setValue,
    ...extra
}) => {
    let [optionsOpen, setOptionsOpen] = useState(false);
    let [selectedValue, setSelectedValue] = useState(defaultValue);

    useEffect(() => {
        setValue(selectedValue);
    }, [selectedValue]);

    return (
        <div
            className={`${styles.select} ${classNames}`}
            {...extra}
            onMouseEnter={() => setOptionsOpen(true)}
            onMouseLeave={() => setOptionsOpen(false)}
        >
            {selectedValue ? selectedValue.text : placeholder}
            <div
                className={`${styles.options} ${
                    optionsOpen && styles.show
                } border-radius-10 background-black-translucent glass-effect w-75`}
                style={{
                    '--values': optionsOpen ? values.length : 0,
                }}
            >
                {values.map((value, index) => (
                    <div
                        className={`${styles.option}`}
                        key={value.value}
                        style={{
                            transform: !optionsOpen
                                ? `translateY(-${index * 100}%)`
                                : 'translateY(0)',
                        }}
                        onClick={() => setSelectedValue(value)}
                    >
                        {value.text}
                    </div>
                ))}
            </div>
            <FontAwesomeIcon icon={faSortDown} className={styles.selectIcon} />
        </div>
    );
};

export default Select;
