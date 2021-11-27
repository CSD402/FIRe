import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/CustomerCarePopup.module.css';
import formStyles from '../styles/Authentication.module.css';

const CustomerCarePopup = () => {
    return (
        <Popup
            trigger={
                <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                    Customer Care
                </button>
            }
            modal
            // nested
        >
            {(close) => (
                <div
                    className={`${styles.modal} background-dark-translucent border-radius-15 glass-effect`}
                >
                    <span
                        className={`${styles.close} foreground-error subheading-text center-text`}
                        onClick={close}
                    >
                        {/* &times; */}
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <div
                        className={`heading-text center-text uppercase-text foreground-white`}
                    >
                        Customer Care
                    </div>
                    <div className={`${styles.content} ${formStyles.authForm}`}>
                        <input
                            className={`${formStyles.inputText} w-50`}
                            type='text'
                            placeholder='Enter Your Name'
                        />
                        <input
                            className={`${formStyles.inputText} w-50`}
                            type='email'
                            placeholder='Enter Email Address'
                        />
                        <input
                            className={`${formStyles.inputText} w-50`}
                            type='text'
                            placeholder='Enter Contact Number'
                        />
                        <textarea
                            rows={3}
                            cols={25}
                            className={`${formStyles.inputText} w-50`}
                            placeholder='Enter Concern'
                        ></textarea>
                        <div className={styles.actions}>
                            <button
                                className='submit-button bold-text border-radius-15'
                                onClick={() => {
                                    close();
                                }}
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                        <button
                            className='submit-button dark bold-text border-radius-15'
                            onClick={() => {
                                close();
                            }}
                        >
                            Call Helpline 100
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CustomerCarePopup;
