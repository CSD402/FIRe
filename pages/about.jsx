import Head from 'next/head';
import CustomBackground from '../components/CustomBackground';

const About = () => {
    const people = [
        {
            name: 'Megha Agwarwal',
            role: 'UI/UX Designer and Data Analysis',
            imageID: '46789157',
            ghUser: 'meghaa105',
        },
        {
            name: 'Kaustubh Rai',
            role: 'Backend Developer and Integration',
            imageID: '57839810',
            ghUser: 'vibhurai',
        },
        {
            name: 'Ishit Beswal',
            role: 'Frontend Developer and Development',
            imageID: '53562523',
            ghUser: 'ishitb',
        },
    ];

    return (
        <>
            <Head>
                <title>FIRe | About Developers</title>
                <meta name='keywords' content='e-fir' />
                <link rel='shortcut icon' href='/logo.svg' />
            </Head>
            <CustomBackground>
                <div
                    id='about'
                    className='w-85 h-90 background-black-translucent glass-effect border-radius-15'
                    style={{
                        padding: '2.5% 5%',
                        zIndex: '50',
                    }}
                >
                    <h1 className='heading-text center-text foreground-primary uppercase-text'>
                        About the Developers
                    </h1>
                    <div className='people d-flex flex-wrap justify-evenly align-center'>
                        {people.map((person) => (
                            <a
                                className='person w-45 background-dark-translucent border-radius-15 d-flex justify-between align-center glass-effect'
                                style={{
                                    padding: '2.5%',
                                    margin: '2.5%',
                                    cursor: 'pointer',
                                }}
                                href={`https://github.com/${person.ghUser}`}
                                target='_blank'
                                key={person.ghUser}
                            >
                                <div className='image border-radius-15'>
                                    <img
                                        width={200}
                                        height={200}
                                        className='border-radius-15'
                                        src={`https://avatars.githubusercontent.com/u/${person.imageID}?v=4`}
                                    />
                                </div>
                                <div className='details'>
                                    <h1 className='subheading-text foreground-primary bold-text'>
                                        {person.name}
                                    </h1>
                                    <br />
                                    <h3 className='foreground-white'>
                                        {person.role}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </CustomBackground>
        </>
    );
};

export default About;
