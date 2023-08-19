import { useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import cookies from 'react-cookies';
import { useRouter } from 'next/router';
import { useStoreActions } from 'easy-peasy';

import styles from '../styles/PoliceComplaintUser.module.css';

const FileFIR = ({ complaintId, status, firFiledBy, firId }) => {
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const router = useRouter();

    const commentsRef = useRef();

    let [fir, setFir] = useState({
        id: '',
        comments: '',
        createdAt: '',
    });

    const getFIR = async () => {
        const authToken = cookies.load('firetoken');

        if (status === 'FIR Lodged') {
            toggleLoader(true);
            fetch(`${process.env.NEXT_PUBLIC_API}/fir/${firId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then(async (r) => {
                    const response = await r.json();
                    console.log(response);
                    setFir(response);
                })
                .catch((e) => console.log(e))
                .finally(() => toggleLoader(false));
        }
    };

    useEffect(() => {
        getFIR();
    }, []);

    const fileFIR = async (e) => {
        e.preventDefault();

        const authToken = cookies.load('firetoken');

        const data = {
            complaint_id: complaintId,
            comments: commentsRef.current.value,
        };

        toggleLoader(true);
        fetch(`${process.env.NEXT_PUBLIC_API}/fir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        })
            .then(async (r) => {
                const response = await r.json();
                console.log(response);
                if (r.status === 201) {
                    toast.success('FIR Filed');
                    router.reload();
                }
            })
            .catch((e) => console.log(e))
            .finally(() => toggleLoader(false));
    };

    return (
        <Popup
            trigger={
                <div className='submit-border border-radius-15 w-100'>
                    {status === 'FIR Lodged' ? 'Review FIR' : 'File FIR'}
                </div>
            }
            nested
            modal
        >
            {(close) =>
                status === 'FIR Lodged' ? (
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
                            FIR filed by {fir.officer_name}
                        </h1>
                        <h3 className='subheading-text uppercase-text foreground-white center-text'>
                            <span className='foreground-primary bold-text'>
                                Contanct:{' '}
                            </span>{' '}
                            {fir.officer_phone}
                        </h3>
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
                        <form
                            className={`${styles.content}`}
                            onSubmit={fileFIR}
                        >
                            <textarea
                                className={`${styles.userData} background-white-translucent foreground-white w-100`}
                                name='comments'
                                id='comments'
                                placeholder='Please enter your report of the complaint'
                                cols='25'
                                rows='8'
                                ref={commentsRef}
                            ></textarea>
                            <button
                                className='submit-button dark border-radius-15 w-100'
                                type='submit'
                            >
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
