import { useForm } from 'react-hook-form';

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

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
        </section>
    );
};

const Login = () => {
    return (
        <div id={styles.authPage}>
            <div id={styles.login} className='border-radius-15 glass-effect'>
                <section id={styles.registerSide}></section>
                <DesignSide />
                <LoginSide />
            </div>
        </div>
    );
};

export default Login;
