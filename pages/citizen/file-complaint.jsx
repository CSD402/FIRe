import { useRef } from 'react';
import CustomBackground from '../../components/CustomBackground';

import styles from '../../styles/FileComplaint.module.css';
import Select from '../../components/Select';

const FileComplaint = () => {
    let select = useRef();
    return (
        <CustomBackground>
            <div
                className={`${styles.fileComplaint} background-black-translucent glass-effect border-radius-15`}
            >
                <h1
                    className={`heading-text bold-text uppercase-text center-text foreground-white`}
                    style={{
                        fontSize: '3.75rem',
                    }}
                >
                    Lodge Complaint
                </h1>
                <h1 className='subheading-text center-text foreground-primary'>
                    Please enter the details as accurately as you can
                </h1>
                <form className={`${styles.form}`} action=''>
                    <input
                        required
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Enter Place of Incident'
                    />
                    <input
                        required
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Enter Pin Code'
                    />
                    <input
                        required
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Select Nearest Police Station'
                    />
                    <input
                        required
                        className={`${styles.inputText}`}
                        style={{
                            color: 'var(--clr-white)',
                        }}
                        type='datetime-local'
                        placeholder='Select Date and Time of Incident'
                    />
                    {/* <input
                        required
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Choose type of Offense'
                    /> */}
                    {/* <div className={styles.selectContainer}>
                        <select
                            ref={select}
                            defaultValue='0'
                            name='offense'
                            id='offense-select'
                            className={`${styles.inputText} ${styles.select} foreground-white`}
                        >
                            <option value='0'>
                                Please choose offense type
                            </option>
                            <option value='rape'>Rape</option>
                            <option value='harass'>Harass</option>
                            <option value='dowry'>Dowry</option>
                            <option value='theft'>Theft</option>
                        </select>
                        <FontAwesomeIcon
                            icon={faSortDown}
                            className={styles.selectIcon}
                        />
                    </div> */}
                    <Select
                        placeholder='Choose type of Offense'
                        values={[
                            { text: 'Rape', value: 'rape' },
                            { text: 'Harass', value: 'harass' },
                            { text: 'Dowry', value: 'dowry' },
                            { text: 'Theft', value: 'theft' },
                        ]}
                        classNames={`foreground-white ${styles.inputText}`}
                    />
                    <textarea
                        required
                        // rows={10}
                        // cols={40}
                        className={`${styles.inputText} ${styles.textArea}`}
                        placeholder='Describe the Incident as accurately as possible'
                    ></textarea>
                    <textarea
                        required
                        // rows={10}
                        // cols={40}
                        className={`${styles.inputText} ${styles.textArea}`}
                        placeholder='Give a description of the suspect as best as you can'
                    ></textarea>
                    <button
                        className={`submit-button dark border-radius-10 w-100 ${styles.btn}`}
                    >
                        LODGE COMPLAINT
                    </button>
                </form>
            </div>
        </CustomBackground>
    );
};

export default FileComplaint;
