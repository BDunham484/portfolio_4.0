'use client';
import { motion } from 'framer-motion';


export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            key='template'
            style={{ width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: .5 } }}

            transition={{ duration: .5 }}
        >
            {children}
        </motion.div>
    );
};