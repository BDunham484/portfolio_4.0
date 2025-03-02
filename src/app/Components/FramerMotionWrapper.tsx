'use client';
import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const FramerMotionWrapper = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname} style={{ width: '100%' }}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default FramerMotionWrapper;
