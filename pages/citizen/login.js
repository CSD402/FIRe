import { useState } from 'react';

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
    return (
        <section
            id={styles.loginSide}
            className={
                registerActive ? styles.registerActive : styles.loginActive
            }
        >
            <h1 className={`${styles.headingText}`}>LOGIN</h1>
            <form className={`${styles.authForm}`}>
                <input
                    className={styles.inputText}
                    type='email'
                    placeholder='Enter Registered Email Address'
                />
                <input
                    className={styles.inputText}
                    type='password'
                    placeholder='Enter password'
                />
                <br />
                <br />
                <button className='submit-button heading-text'>SIGN IN!</button>
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
    return (
        <section
            id={styles.registerSide}
            className={
                registerActive ? styles.registerActive : styles.loginActive
            }
        >
            <h1 className={`${styles.headingText}`}>REGISTER</h1>
            <form className={`${styles.authForm}`}>
                <input
                    className={styles.inputText}
                    type='text'
                    placeholder='Enter Full Name'
                />
                <input
                    className={styles.inputText}
                    type='text'
                    placeholder='Enter Phone Number'
                />
                <input
                    className={styles.inputText}
                    type='number'
                    placeholder='Enter Aadhar Number'
                />
                <textarea
                    rows={3}
                    cols={25}
                    className={`${styles.inputText}`}
                    placeholder='Enter Full Address'
                ></textarea>
                <input
                    className={styles.inputText}
                    type='email'
                    placeholder='Enter Email Address'
                />
                <input
                    className={styles.inputText}
                    type='password'
                    placeholder='Enter password'
                />
                <br />
                <br />
                <button className='submit-button'>SIGN UP!</button>
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
