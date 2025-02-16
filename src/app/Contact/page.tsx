'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useActiveSection } from '../../context/ActiveSectionContext';
import { useSectionInView } from '../../hooks/useSectionInView';

const Contact = () => {
    const { ref, inView } = useSectionInView(0.6); // adjust threshold as needed
    const { setActiveSection } = useActiveSection();

    useEffect(() => {
        if (inView) {
            setActiveSection('Contact');
        }
    }, [inView, setActiveSection]);

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
            }}
        >
            Contact
        </motion.section>
    );
};

export default Contact;