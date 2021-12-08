import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Select from '../../components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/Authentication.module.css';

const DesignSide = ({ registerActive }) => {
    return (
        <section
            id={styles.designSide}
            className={
                registerActive ? styles.registerActive : styles.loginActive
            }
        >
            <h1 className={`${styles.headingText} ${styles.headingText1}`}>
                CITIZEN
            </h1>
            <h1 className={`${styles.headingText} ${styles.headingText2}`}>
                PORTAL
            </h1>
        </section>
    );
};

const LoginSide = ({ registerActive, setRegisterActive }) => {
    const { clientLogin } = useStoreActions((actions) => actions.accountModel);
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        clientLogin({ data, toggleLoader });
    };

    return (
        <section
            id={styles.loginSide}
            className={
                registerActive ? styles.registerActive : styles.loginActive
            }
        >
            <h1 className={`${styles.headingText}`}>LOGIN</h1>
            <form
                className={`${styles.authForm}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={`${styles.inputText} ${
                        errors.aadhaar ? styles.error : ''
                    }`}
                    type='number'
                    placeholder='Enter Registered Aadhar Number'
                    {...register('aadhaar', { required: true })}
                />
                {errors.aadhaar?.type === 'required' ? (
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
            <button
                className={`submit-border w-75 ${styles.changeFormBtn}`}
                onClick={() => setRegisterActive(true)}
            >
                New User? Register.
            </button>
        </section>
    );
};

const RegisterSide = ({ registerActive, setRegisterActive }) => {
    const { clientRegister } = useStoreActions(
        (actions) => actions.accountModel,
    );
    const { toggleLoader } = useStoreActions((actions) => actions.loaderModel);

    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let [gender, setGender] = useState('');

    const onSubmit = (data) => {
        let newUser = { ...data, gender: gender.value };
        clientRegister({ data: newUser, toggleLoader });
    };

    return (
        <section
            id={styles.registerSide}
            className={
                registerActive ? styles.registerActive : styles.loginActive
            }
        >
            <h1 className={`${styles.headingText}`}>REGISTER</h1>
            <form
                className={`${styles.authForm}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={`${styles.inputText} ${
                        errors.name ? styles.error : ''
                    }`}
                    type='text'
                    placeholder='Enter Full Name'
                    {...register('name', { required: true })}
                />
                <input
                    className={`${styles.inputText} ${
                        errors.phone_number ? styles.error : ''
                    }`}
                    type='text'
                    placeholder='Enter Phone Number'
                    {...register('phone_number', { required: true })}
                />
                <input
                    className={`${styles.inputText} ${
                        errors.aadhaar ? styles.error : ''
                    }`}
                    type='number'
                    placeholder='Enter Aadhar Number'
                    {...register('aadhaar', { required: true })}
                />
                <textarea
                    rows={3}
                    cols={25}
                    className={`${styles.inputText} ${
                        errors.residence_area ? styles.error : ''
                    }`}
                    placeholder='Enter Full Address'
                    {...register('residence_area', { required: true })}
                ></textarea>
                <input
                    className={`${styles.inputText} ${
                        errors.email ? styles.error : ''
                    }`}
                    type='email'
                    placeholder='Enter Email Address'
                    {...register('email', { required: true })}
                />
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
                        style={{
                            height: '100%',
                        }}
                    >
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </div>
                </div>
                <Select
                    classNames={`${styles.inputText}`}
                    placeholder='Select Gender'
                    values={[
                        { text: 'Male', value: 'Male' },
                        { text: 'Female', value: 'Female' },
                        { text: 'Other', value: 'Other' },
                    ]}
                    dark={false}
                    setValue={setGender}
                />
                {errors.email?.type === 'required' ? (
                    <p
                        className='normal-text center-text foreground-error'
                        style={{
                            textTransform: 'capitalize',
                        }}
                    >
                        {Object.keys(errors)[0]} is required!
                    </p>
                ) : (
                    <p
                        className='normal-text center-text foreground-dark'
                        style={{ opacity: 0, pointerEvents: 'none' }}
                    >
                        Email is required!
                    </p>
                )}
                <button className='submit-button' type='submit'>
                    SIGN UP!
                </button>
            </form>
            <button
                className={`submit-border w-75 ${styles.changeFormBtn}`}
                onClick={() => setRegisterActive(false)}
            >
                Returning User? Login.
            </button>
        </section>
    );
};

const Login = () => {
    const router = useRouter();

    const { logged_in } = useStoreState((store) => store.accountModel);

    const [registerActive, setRegisterActive] = useState(false);

    useEffect(() => {
        if (logged_in) {
            router.replace('/');
        }
    }, [logged_in]);

    return (
        <>
            <Head>
                <title>FIRe | Citizen Login</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div id={styles.authPage}>
                <div
                    id={styles.login}
                    className='border-radius-15 glass-effect'
                >
                    <RegisterSide
                        registerActive={registerActive}
                        setRegisterActive={setRegisterActive}
                    />
                    <DesignSide registerActive={registerActive} />
                    <LoginSide
                        registerActive={registerActive}
                        setRegisterActive={setRegisterActive}
                    />
                </div>
            </div>
        </>
    );
};

export default Login;
