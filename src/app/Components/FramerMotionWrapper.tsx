'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import FrozenRoute from './FrozenRoute';

const FramerMotionWrapper = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPath(pathname);
        }, 50);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div key={currentPath}>
                <FrozenRoute>
                    {children}
                </FrozenRoute>
            </motion.div>
        </AnimatePresence>
    );
};

export default FramerMotionWrapper;
