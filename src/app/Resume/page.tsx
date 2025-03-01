'use client';
import { motion } from 'framer-motion';
// import { useEffect } from 'react';
// import { useActiveSection } from '../../context/ActiveSectionContext';
import { useSectionInView } from '../../hooks/useSectionInView';

const Resume = () => {
    const { ref, inView } = useSectionInView(0.6); // adjust threshold as needed
    // const { activeSectionRef } = useActiveSection();

    // useEffect(() => {
    //     if (inView) {
    //         activeSectionRef.current = ('Resume');
    //     }
    // }, [inView, activeSectionRef]);

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
            Resume
        </motion.section>
    );
};

export default Resume;