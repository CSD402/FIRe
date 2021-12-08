import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import CustomBackground from '../../components/CustomBackground';
import PoliceComplaint from '../../components/PoliceComplaint';
import Select from '../../components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cookies from 'react-cookies';
import { useStoreActions } from 'easy-peasy';

import styles from '../../styles/ReviewComplaints.module.css';
import { toast } from 'react-toastify';

const ReviewComplaints = () => {
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    let dateInput = useRef();
    let submitRef = useRef();

    let [defaultComplaints, setDefaultComplaints] = useState([]);
    let [complaints, setComplaints] = useState(defaultComplaints);
    let [typeFilter, setTypeFilter] = useState({
        text: 'All',
        value: '',
    });
    let [placeFilter, setPlaceFilter] = useState('');
    let [userFilter, setUserFilter] = useState('');
    let [dateFilter, setDateFilter] = useState(new Date('1970-01-01'));

    const filter = () => {
        setComplaints(
            defaultComplaints.filter((c) => {
                let date = new Date(c.date_time_of_incident);
                if (
                    c.incident_type
                        .toLowerCase()
                        .startsWith(typeFilter.value.toLowerCase()) &&
                    c.place_of_incident
                        .toLowerCase()
                        .startsWith(placeFilter.toLowerCase()) &&
                    c.user.toLowerCase().startsWith(userFilter.toLowerCase()) &&
                    new Date(
                        `${date.getFullYear()}-${
                            date.getMonth() + 1
                        }-${date.getDate()}`,
                    ) >= new Date(dateFilter)
                )
                    return c;
            }),
        );
    };

    const filterSubmit = (e) => {
        e.preventDefault();
        filter();
    };

    const getComplaints = async () => {
        const authToken = cookies.load('firetoken');

        toggleLoader(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/complaint`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (r) => {
                const response = await r.json();
                console.log(response);
                setDefaultComplaints(response);
                setComplaints(response);
            })
            .catch((e) => {
                console.log(e);
                toast.error(e);
            })
            .finally(() => toggleLoader(false));
    };

    useEffect(() => {
        getComplaints();
    }, []);

    return (
        <>
            <Head>
                <title>FIRe | Police Reviw Complaints</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <CustomBackground>
                <div
                    className={`background-black-translucent glass-effect border-radius-15 ${styles.reviewComplaints}`}
                >
                    <h1
                        className='heading-text foreground-white uppercase-text center-text'
                        style={{
                            height: '7.5%',
                        }}
                    >
                        Past Complaints
                    </h1>
                    <form
                        onSubmit={filterSubmit}
                        className={`${styles.searchWrapper}`}
                    >
                        <div className={`${styles.filter}`}>
                            <input
                                className={`${styles.inputText} w-30 foreground-white`}
                                type='text'
                                placeholder='Search Complaint with Place of Incident'
                                onChange={(e) => setPlaceFilter(e.target.value)}
                            />
                            <input
                                className={`${styles.inputText} w-30 foreground-white`}
                                type='text'
                                placeholder='Search Complaint with Complaintee Name'
                                onChange={(e) => setUserFilter(e.target.value)}
                            />
                            <Select
                                placeholder='Choose type of Offense'
                                values={[
                                    { text: 'All', value: '' },
                                    { text: 'Rape', value: 'rape' },
                                    { text: 'Harass', value: 'harass' },
                                    { text: 'Dowry', value: 'dowry' },
                                    { text: 'Theft', value: 'theft' },
                                ]}
                                defaultValue={{ text: 'All', value: '' }}
                                setValue={setTypeFilter}
                                classNames={`foreground-white w-30 ${styles.inputText}`}
                            />
                        </div>
                        <div className={`${styles.dateInput}`}>
                            <div className={`${styles.dateWrapper} w-75`}>
                                <label
                                    htmlFor='date'
                                    className='subheading-text foreground-primary'
                                >
                                    Select Start Date
                                </label>
                                <input
                                    ref={dateInput}
                                    id='date'
                                    className={`${styles.inputText} w-75 foreground-white`}
                                    type='date'
                                    placeholder='Select Date and Time of Incident'
                                    onChange={(e) =>
                                        setDateFilter(e.target.value)
                                    }
                                />
                                <div
                                    className={`${styles.close}`}
                                    onClick={() => {
                                        dateInput.current.value = '';
                                        setDateFilter(
                                            (curr) => new Date('1970-01-01'),
                                        );
                                        setComplaints(
                                            defaultComplaints.filter((c) => {
                                                let date = new Date(
                                                    c.date_time_of_incident,
                                                );
                                                if (
                                                    c.type
                                                        .toLowerCase()
                                                        .startsWith(
                                                            typeFilter.value.toLowerCase(),
                                                        ) &&
                                                    c.place_of_incident
                                                        .toLowerCase()
                                                        .startsWith(
                                                            placeFilter.toLowerCase(),
                                                        ) &&
                                                    new Date(
                                                        `${date.getFullYear()}-${
                                                            date.getMonth() + 1
                                                        }-${date.getDate()}`,
                                                    ) >= new Date('1970-01-01')
                                                )
                                                    return c;
                                            }),
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='submit-button w-25 border-radius-10'
                                ref={submitRef}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className={`${styles.complaints}`}>
                        {complaints.length > 0 ? (
                            complaints.map((complaint) => (
                                <PoliceComplaint
                                    id={complaint.uid}
                                    key={complaint.uid}
                                    complaint={complaint}
                                />
                            ))
                        ) : (
                            <p className='subheading-text center-text foreground-error'>
                                No Results Found!
                            </p>
                        )}
                    </div>
                </div>
            </CustomBackground>
        </>
    );
};

export default ReviewComplaints;
