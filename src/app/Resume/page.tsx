'use client';
import { motion } from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';
import { usePathname } from 'next/navigation';

const Resume = () => {
    const { ref } = useSectionInView(0.6);
    const pathname = usePathname();


    return (
        <motion.section
            key={`Resume-${pathname}`}
            ref={ref}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            // transition={{ duration: 0.5, ease: 'easeInOut' }}
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