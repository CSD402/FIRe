import { useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/PoliceComplaintUser.module.css';

const PoliceComplaintUser = ({ userId, username }) => {
    let [user, setUser] = useState({
        id: '123456',
        name: 'Megha Agarwal',
        email: 'ma715@snu.edu.in',
        phoneNumber: '9876543210',
        address: 'Shiv Nadar University, Dadri - 201314, Uttar Pradesh',
        aadhar: '405019181723',
    });

    return (
        <Popup
            trigger={
                <p
                    className={`${styles.userData} ${styles.userDataButton} foreground-white background-primary-translucent`}
                >
                    <span className='foreground-white bold-text'>
                        Complaintee:{' '}
                    </span>{' '}
                    {username}
                </p>
            }
            nested
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
                        Complaintee Details
                    </h1>
                    <div className={`${styles.content}`}>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Full Name:{' '}
                            </span>{' '}
                            {user.name}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Email Address:{' '}
                            </span>{' '}
                            {user.email}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Phone Number:{' '}
                            </span>{' '}
                            {user.phoneNumber}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Address:{' '}
                            </span>{' '}
                            {user.address}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Aadhar:{' '}
                            </span>{' '}
                            {user.aadhar}
                        </p>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default PoliceComplaintUser;
