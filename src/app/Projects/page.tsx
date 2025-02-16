'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useActiveSection } from '../../context/ActiveSectionContext';
import { useSectionInView } from '../../hooks/useSectionInView';
// import styles from './Project.module.css';

const Projects = () => {
    const { ref, inView } = useSectionInView(0.6); // adjust threshold as needed
    const { setActiveSection } = useActiveSection();

    useEffect(() => {
        if (inView) {
            setActiveSection('Projects');
        }
    }, [inView, setActiveSection]);
    // const { background } = styles;

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='section'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
            Projects
        </motion.section>
    );
};

export default Projects;