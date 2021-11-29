import { useRef } from 'react';
import CustomBackground from '../../components/CustomBackground';
import styles from '../../styles/PastComplaints.module.css';

const PastComplaints = () => {
    let complaints = [
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
    ];

    let dateInput = useRef();

    return (
        <CustomBackground>
            <div
                className={`background-black-translucent glass-effect border-radius-15 ${styles.pastComplaints}`}
                // style={{
                //     overflow: 'scroll',
                // }}
            >
                <h1
                    className='heading-text foreground-white uppercase-text center-text'
                    style={{
                        height: '7.5%',
                    }}
                >
                    Past Complaints
                </h1>
                <div className={`${styles.searchWrapper}`}>
                    <input
                        className={`${styles.inputText} w-100 foreground-white`}
                        type='text'
                        placeholder='Search Complaint with Place of Incident'
                    />
                    <div className={`${styles.dateInput}`}>
                        <label
                            htmlFor='date'
                            className='subheading-text foreground-primary w-35'
                        >
                            Select Date and Time of Incident
                        </label>
                        <input
                            ref={dateInput}
                            id='date'
                            className={`${styles.inputText}`}
                            style={{
                                color: 'var(--clr-white)',
                            }}
                            type='datetime-local'
                            placeholder='Select Date and Time of Incident'
                        />
                    </div>
                </div>
                <div className={`${styles.complaints}`}>
                    {complaints.map((complaint) => (
                        <div
                            id={complaint.id}
                            className={`${styles.complaint} background-black-translucent glass-effect border-radius-10`}
                        >
                            <div className={`${styles.left}`}>
                                <h1
                                    className={`subheading-text foreground-primary ${styles.complaintType}`}
                                >
                                    {complaint.type} Case
                                </h1>
                                <p
                                    className={`${styles.complaintSlug} foreground-white`}
                                >
                                    {complaint.slug}
                                </p>
                                <p
                                    className={`${styles.complaintSlug} foreground-white`}
                                >
                                    {complaint.placeOfIncident}
                                </p>
                            </div>
                            <div className={`${styles.right}`}>
                                <p
                                    className={`${styles.complaintDate} foreground-white`}
                                >
                                    <span className='foreground-primary bold-text'>
                                        Date:
                                    </span>{' '}
                                    {Date(complaint.date).toString()}
                                </p>
                                <p
                                    className={`${styles.complaintDate} foreground-white`}
                                >
                                    <span className='foreground-primary bold-text'>
                                        Status:
                                    </span>{' '}
                                    {complaint.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CustomBackground>
    );
};

export default PastComplaints;
