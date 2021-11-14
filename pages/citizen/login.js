import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                        errors.email ? styles.error : ''
                    }`}
                    type='email'
                    placeholder='Enter Registered Email Address'
                    {...register('email', { required: true })}
                />
                {errors.email?.type === 'required' ? (
                    <p className='normal-text center-text foreground-error'>
                        Email is required!
                    </p>
                ) : (
                    <p
                        className='normal-text center-text foreground-dark'
                        style={{ opacity: 0, pointerEvents: 'none' }}
                    >
                        Email is required!
                    </p>
                )}

                <input
                    className={`${styles.inputText} ${
                        errors.password ? styles.error : ''
                    }`}
                    type='password'
                    placeholder='Enter password'
                    {...register('password', {
                        required: true,
                        min: 8,
                        max: 32,
                    })}
                />
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        console.log(Object.keys(errors)[0]);
        console.log(errors);
    }, [errors]);

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
                        errors.fullName ? styles.error : ''
                    }`}
                    type='text'
                    placeholder='Enter Full Name'
                    {...register('fullName', { required: true })}
                />
                <input
                    className={`${styles.inputText} ${
                        errors.number ? styles.error : ''
                    }`}
                    type='text'
                    placeholder='Enter Phone Number'
                    {...register('number', { required: true })}
                />
                <input
                    className={`${styles.inputText} ${
                        errors.aadhar ? styles.error : ''
                    }`}
                    type='number'
                    placeholder='Enter Aadhar Number'
                    {...register('aadhar', { required: true })}
                />
                <textarea
                    rows={3}
                    cols={25}
                    className={`${styles.inputText} ${
                        errors.address ? styles.error : ''
                    }`}
                    placeholder='Enter Full Address'
                    {...register('address', { required: true })}
                ></textarea>
                <input
                    className={`${styles.inputText} ${
                        errors.email ? styles.error : ''
                    }`}
                    type='email'
                    placeholder='Enter Email Address'
                    {...register('email', { required: true })}
                />
                <input
                    className={`${styles.inputText} ${
                        errors.password ? styles.error : ''
                    }`}
                    type='password'
                    placeholder='Enter password'
                    {...register('password', { required: true })}
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

                <br />
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
    const [registerActive, setRegisterActive] = useState(false);

    return (
        <div id={styles.authPage}>
            <div id={styles.login} className='border-radius-15 glass-effect'>
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
    );
};

export default Login;
