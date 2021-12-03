import { useState } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/PoliceComplaintUser.module.css';

const FileFIR = ({ complaintId, status, firFiledBy }) => {
    let [fir, setFir] = useState({
        id: '123456',
        comments:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quae esse soluta optio expedita exercitationem error architecto voluptatibus aliquam! Aliquid.',
        createdAt: '2021-08-09',
    });

    return (
        <Popup
            trigger={
                <div className='submit-border border-radius-15 w-100'>
                    {status === 'FIR Filed' ? 'Review FIR' : 'File FIR'}
                </div>
            }
            nested
            modal
        >
            {(close) =>
                status === 'FIR Filed' ? (
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
                        <h1 className='heading-text center-text uppercase-text foreground-primary'>
                            FIR filed by {firFiledBy}
                        </h1>
                        <div className={`${styles.content}`}>
                            <p
                                className={`${styles.userData} background-white-translucent foreground-white w-100`}
                            >
                                <span className='foreground-primary bold-text'>
                                    Details:{' '}
                                </span>
                                {fir.comments}
                            </p>
                            <p
                                className={`${styles.userData} background-white-translucent foreground-white w-100`}
                            >
                                <span className='foreground-primary bold-text'>
                                    Filing Date:{' '}
                                </span>
                                {new Date(fir.createdAt).toString()}
                            </p>
                        </div>
                    </div>
                ) : (
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
                        <h1 className='heading-text center-text uppercase-text foreground-primary'>
                            Convert Complaint to FIR
                        </h1>
                        <form className={`${styles.content}`}>
                            <textarea
                                className={`${styles.userData} background-white-translucent foreground-white w-100`}
                                name='comments'
                                id='comments'
                                placeholder='Please enter your report of the complaint'
                                cols='25'
                                rows='8'
                            ></textarea>
                            <button className='submit-button dark border-radius-15 w-100'>
                                Submit FIR
                            </button>
                        </form>
                    </div>
                )
            }
        </Popup>
    );
};

export default FileFIR;
