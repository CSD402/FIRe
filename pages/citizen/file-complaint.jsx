import { useState, useRef } from 'react';
import cookies from 'react-cookies';
import CustomBackground from '../../components/CustomBackground';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import styles from '../../styles/FileComplaint.module.css';
import Select from '../../components/Select';

const FileComplaint = () => {
    let router = useRouter();

    let place_of_incidentRef = useRef();
    let pinCodeRef = useRef();
    let policeStationRef = useRef();
    let dateTimeRef = useRef();
    let descriptionRef = useRef();
    let suspectRef = useRef();

    let [crimeType, setCrimeType] = useState({ text: '', value: '' });

    const submit = async (e) => {
        e.preventDefault();

        let data = {
            place_of_incident: place_of_incidentRef.current.value,
            // pincode is seensubjects for now
            // seen_subjects: pinCodeRef.current.value,
            seen_subjects: true,
            nearest_station: policeStationRef.current.value,
            date_time_of_incident: dateTimeRef.current.value,
            comments: descriptionRef.current.value,
            suspect_desc: suspectRef.current.value,
            incident_type: crimeType.value,
        };
        let authToken = cookies.load('firetoken');

        await fetch(`${process.env.NEXT_PUBLIC_API}/complaint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        })
            .then(async (resp) => {
                console.log(resp);
                const res = await resp.json();
                console.log(res);
                toast.dark('Complaint Filed');
                router.push('/citizen/past-complaints');
            })
            .catch((e) => {
                console.log('Error =>', e);
            });
    };

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
                <form className={`${styles.form}`} onSubmit={submit}>
                    <input
                        required
                        ref={place_of_incidentRef}
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Enter Place of Incident'
                    />
                    <input
                        required
                        ref={pinCodeRef}
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Enter Pin Code'
                    />
                    <input
                        required
                        ref={policeStationRef}
                        className={`${styles.inputText}`}
                        type='text'
                        placeholder='Select Nearest Police Station'
                    />
                    <input
                        required
                        ref={dateTimeRef}
                        className={`${styles.inputText}`}
                        style={{
                            color: 'var(--clr-white)',
                        }}
                        type='datetime-local'
                        placeholder='Select Date and Time of Incident'
                    />
                    <Select
                        placeholder='Choose type of Offense'
                        values={[
                            { text: 'Rape', value: 'rape' },
                            { text: 'Harass', value: 'harass' },
                            { text: 'Dowry', value: 'dowry' },
                            { text: 'Theft', value: 'theft' },
                        ]}
                        classNames={`foreground-white ${styles.inputText}`}
                        setValue={setCrimeType}
                    />
                    <textarea
                        required
                        ref={descriptionRef}
                        // rows={10}
                        // cols={40}
                        className={`${styles.inputText} ${styles.textArea}`}
                        placeholder='Describe the Incident as accurately as possible'
                    ></textarea>
                    <textarea
                        required
                        ref={suspectRef}
                        // rows={10}
                        // cols={40}
                        className={`${styles.inputText} ${styles.textArea}`}
                        placeholder='Give a description of the suspect as best as you can'
                    ></textarea>
                    <button
                        type='submit'
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
