'use client';
// import styles from './About.module.css';

const About = () => {
    // const { background } = styles;
    console.log('About');

    return (
        <div
        // className={background}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
            About
        </div>
    );
};

export default About;