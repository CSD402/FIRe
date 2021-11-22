import Head from 'next/head';
import Image from 'next/image';
import { useStoreState } from 'easy-peasy';

import styles from '../styles/Home.module.css';

const LoggedOutHome = () => {
    return (
        <div className={styles.direction}>
            <Image
                src='/images/shield.png'
                height={250}
                width={250}
                alt='Shield'
            />
            <h1 className='heading-text foreground-white center-text'>
                How can we help you?
            </h1>
            <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                POLICE
            </button>
            <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                CITIZEN
            </button>
        </div>
    );
};

const CitizenHome = () => {
    return (
        <div className={styles.direction}>
            <Image
                src='/images/shield.png'
                height={175}
                width={175}
                alt='Shield'
            />
            <h1 className='heading-text foreground-white center-text'>
                Welcome, {'Suresh Kumar'}
            </h1>
            <a
                href='/citizen/file-complaint'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                File Complaint
            </a>
            <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                Customer Care
            </button>
            <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                Past Complaints
            </button>
        </div>
    );
};

const PoliceHome = () => {
    return (
        <div className={styles.direction}>
            <Image
                src='/images/shield.png'
                height={175}
                width={175}
                alt='Shield'
            />
            <h1 className='heading-text foreground-white center-text'>
                Welcome, {'Rakesh Kumar'}
            </h1>
        </div>
    );
};

const Home = () => {
    const loginType = useStoreState((store) => store.accountModel.type);

    return (
        <>
            <Head>
                <title>FIRe | Home</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div id={styles.home}>
                {loginType === 1 ? (
                    <CitizenHome />
                ) : loginType === 2 ? (
                    <PoliceHome />
                ) : (
                    <LoggedOutHome />
                )}
                <div className={styles.map}></div>
            </div>
        </>
    );
};

export default Home;
