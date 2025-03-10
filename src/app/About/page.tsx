'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSectionInView } from '../../hooks/useSectionInView';

const About = () => {
    const { ref } = useSectionInView(0.6);
    // const pathname = usePathname();


    return (
        <motion.section
            key='About'
            ref={ref}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            About
        </motion.section>
    );
};

export default About;