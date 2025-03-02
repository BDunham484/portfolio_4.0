'use client';
import { motion } from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';

const Contact = () => {
    const { ref } = useSectionInView(0.6);

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