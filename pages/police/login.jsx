import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/Authentication.module.css';

const DesignSide = () => {
    return (
        <section id={styles.designSide} className={styles.loginActive}>
            <h1 className={`${styles.headingText} ${styles.headingText1}`}>
                POLICE
            </h1>
            <h1 className={`${styles.headingText} ${styles.headingText2}`}>
                PORTAL
            </h1>
        </section>
    );
};

const LoginSide = () => {
    const { policeLogin } = useStoreActions((actions) => actions.accountModel);
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        policeLogin({ data, toggleLoader });
    };

    const [showPass, setShowPass] = useState(false);

    return (
        <section id={styles.loginSide} className={styles.loginActive}>
            <h1 className={`${styles.headingText}`}>LOGIN</h1>
            <form
                className={`${styles.authForm}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={`${styles.inputText} ${
                        errors.email ? styles.error : ''
                    }`}
                    type='text'
                    placeholder='Enter Aadhar Number'
                    {...register('aadhaar', { required: true })}
                />
                {errors.email?.type === 'required' ? (
                    <p className='normal-text center-text foreground-error'>
                        Aadhar is required!
                    </p>
                ) : (
                    <p
                        className='normal-text center-text foreground-dark'
                        style={{ opacity: 0, pointerEvents: 'none' }}
                    >
                        Aadhar is required!
                    </p>
                )}

                <div className={`${styles.passContainer} w-100`}>
                    <input
                        className={`${styles.inputText} ${
                            errors.password ? styles.error : ''
                        }`}
                        type={showPass ? 'text' : 'password'}
                        placeholder='Enter password'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <div
                        className={`${styles.passShowIcon} foreground-white subheading-text`}
                        onClick={() => setShowPass((curr) => !curr)}
                    >
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </div>
                    {errors.password ? (
                        <p className='normal-text center-text foreground-error'>
                            {errors.password?.type === 'required'
                                ? 'Password is required!'
                                : errors.password.type === 'min' ||
                                  errors.password.type === 'max'
                                ? 'Password pattern is not correct!'
                                : errors.password.type}
                        </p>
                    ) : (
                        <p
                            className='normal-text center-text foreground-dark'
                            style={{ opacity: 0, pointerEvents: 'none' }}
                        >
                            Password is required!
                        </p>
                    )}
                </div>
                <br />
                <button className='submit-button heading-text' type='submit'>
                    SIGN IN!
                </button>
            </form>
        </section>
    );
};

const Login = () => {
    const router = useRouter();

    const { logged_in } = useStoreState((store) => store.accountModel);

    useEffect(() => {
        if (logged_in) {
            router.replace('/');
        }
    }, [logged_in]);

    return (
        <>
            <Head>
                <title>FIRe | Police Official Login</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div id={styles.authPage}>
                <div
                    id={styles.login}
                    className='border-radius-15 glass-effect'
                >
                    <section id={styles.registerSide}></section>
                    <DesignSide />
                    <LoginSide />
                </div>
            </div>
        </>
    );
};

export default Login;
