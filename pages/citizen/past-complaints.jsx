import { useRef } from 'react';
import CustomBackground from '../../components/CustomBackground';
import CitizenComplaint from '../../components/CitizenComplaint';
import styles from '../../styles/PastComplaints.module.css';

const PastComplaints = () => {
    let complaints = [
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            details:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad minus laboriosam debitis corporis hic rerum eligendi quae quasi beatae eaque excepturi asperiores a dolorum labore repudiandae assumenda eveniet quibusdam optio consequuntur voluptatum explicabo voluptates, rem alias et? Provident, non earum!',
            suspects:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id perferendis, ratione nesciunt voluptatem tempora suscipit corrupti quas eaque alias ea ex quisquam dolore totam a et dicta repudiandae saepe earum dolor adipisci similique doloremque pariatur.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
            id: '123456',
            placeOfIncident: 'Sarita Vihar',
            slug: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'Dowry',
            status: 'Under Review',
        },
        {
            date: '2021-11-19T01:55',
            pinCode: '201314',
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
                        <CitizenComplaint
                            id={complaint.id}
                            complaint={complaint}
                        />
                    ))}
                </div>
            </div>
        </CustomBackground>
    );
};

export default PastComplaints;
