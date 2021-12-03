import Head from 'next/head';
import Image from 'next/image';
import { useStoreState } from 'easy-peasy';

import CustomerCarePopup from '../components/CustomerCarePopup';

import styles from '../styles/Home.module.css';
import CustomBackground from '../components/CustomBackground';

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
            <a
                href='/police/login'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                POLICE
            </a>
            <a
                href='/citizen/login'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                CITIZEN
            </a>
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

            {/* <button className='btn-pulse border-radius-10 background-primary foreground-white'>
                Customer Care
            </button> */}
            <CustomerCarePopup />
            <a
                href='/citizen/past-complaints'
                className='btn-pulse border-radius-10 background-primary foreground-white'
            >
                Past Complaints
            </a>
        </div>
    );
};

const SectionButton = ({ heading, data }) => {
    return (
        <div className={`${styles.sectionButton}`}>
            <h1 className='heading-text foreground-dark center-text'>
                {heading}
            </h1>
            <div
                className={`heading-text background-primary foreground-white border-radius-15 center-text ${styles.sectionData}`}
            >
                {data}
            </div>
        </div>
    );
};

const PoliceHome = () => {
    return (
        <div
            className={`${styles.policeHome} background-white-translucent glass-effect border-radius-15`}
        >
            <div className={`${styles.policeIntro}`}>
                <h1 className='heading-text foreground-dark'>
                    Welcome, {'Rakesh Kumar'}
                </h1>
                <h1 className='subheading-text foreground-dark'>
                    {'Sub-Inspector'}
                </h1>
            </div>
            <div className={`${styles.policeSections}`}>
                <SectionButton heading='Active FIRS' data={<span>6723</span>} />
                <SectionButton
                    heading='FIRs this month'
                    data={<span>269</span>}
                />
                <SectionButton
                    heading='Data Analytics'
                    data={
                        <Image
                            src='/images/chart.png'
                            height={325}
                            width={525}
                            alt='DATA'
                        />
                    }
                />
            </div>
            <a
                href='/police/review-complaints'
                className={`submit-button dark heading-text w-75 border-radius-15 ${styles.policeHomeButton}`}
            >
                REVIEW COMPLAINTS
            </a>
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
                    <CustomBackground>
                        <PoliceHome />
                    </CustomBackground>
                ) : (
                    <LoggedOutHome />
                )}
                {loginType === 2 ? <></> : <div className={styles.map}></div>}
            </div>
        </>
    );
};

export default Home;
