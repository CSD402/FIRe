import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cookies from 'react-cookies';

import styles from '../styles/PoliceComplaintUser.module.css';

const PoliceComplaintUser = ({ userId, username }) => {
    let [user, setUser] = useState({
        _id: '',
        name: '',
        email: '',
        phone_number: '',
        residence_area: '',
        aadhaar: '',
        gender: '',
    });

    const getUserData = async () => {
        let authToken = cookies.load('firetoken');

        fetch(`${process.env.NEXT_PUBLIC_API}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (r) => {
                const response = await r.json();
                setUser(response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUserData();
    }, []);

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
                            {user.phone_number}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Address:{' '}
                            </span>{' '}
                            {user.residence_area}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Aadhar:{' '}
                            </span>{' '}
                            {user.aadhaar}
                        </p>
                        <p
                            className={`${styles.userData} background-white-translucent foreground-white`}
                        >
                            <span className='foreground-primary bold-text'>
                                Gender:{' '}
                            </span>{' '}
                            {user.gender}
                        </p>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default PoliceComplaintUser;
