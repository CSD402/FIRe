import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetter, sluggify } from '../utils/string';

import styles from '../styles/CitizenComplaint.module.css';

const CitizenComplaint = ({ complaint }) => {
    return (
        <Popup
            trigger={
                <div
                    className={`${styles.complaint} background-black-translucent glass-effect border-radius-10`}
                >
                    <div className={`${styles.left}`}>
                        <h1
                            className={`subheading-text foreground-primary ${styles.complaintType}`}
                        >
                            {capitalizeFirstLetter(complaint.incident_type)}{' '}
                            Case
                        </h1>
                        <p
                            className={`${styles.complaintSlug} foreground-white`}
                        >
                            {sluggify(complaint.comments)}
                        </p>
                        <p
                            className={`${styles.complaintSlug} foreground-white`}
                        >
                            {complaint.place_of_incident}
                        </p>
                    </div>
                    <div className={`${styles.right}`}>
                        <p
                            className={`${styles.complaintDate} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Date:
                            </span>{' '}
                            {new Date(
                                complaint.date_time_of_incident,
                            ).toString()}
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
            }
            modal
        >
            {(close) => (
                <div
                    className={`${styles.modal} background-black-translucent border-radius-15 glass-effect`}
                >
                    <span
                        className={`${styles.close} foreground-error subheading-text center-text`}
                        onClick={close}
                    >
                        {/* &times; */}
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <h1 className='heading-text center-text uppercase-text foreground-white'>
                        Complaint {complaint.uid}
                    </h1>
                    <h3 className='subheading-text center-text uppercase-text foreground-white'>
                        <span className='foreground-primary'>Status: </span>
                        {complaint.status}
                    </h3>
                    <div className={`${styles.content}`}>
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Type of Case:{' '}
                            </span>{' '}
                            {complaint.incident_type}
                        </p>
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Place of Incident:{' '}
                            </span>{' '}
                            {complaint.place_of_incident}
                        </p>
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Pin Code:{' '}
                            </span>{' '}
                            {complaint.place_of_incident}
                        </p>
                        {/* <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>Nearest Police Station: </span> {complaint.policeStation}
                        </p> */}
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Date and Time of Incident:{' '}
                            </span>{' '}
                            {complaint.date_time_of_incident}
                        </p>
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Details of Incident:{' '}
                            </span>{' '}
                            {complaint.comments}
                        </p>
                        <p
                            className={`${styles.complaintData} foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Details of Suspect:{' '}
                            </span>{' '}
                            {complaint.suspect_desc}
                        </p>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CitizenComplaint;
