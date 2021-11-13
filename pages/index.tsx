import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>FIRe | Home</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <div id={styles.home}>
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
                <div className={styles.map}></div>
            </div>
        </>
    );
};

export default Home;
