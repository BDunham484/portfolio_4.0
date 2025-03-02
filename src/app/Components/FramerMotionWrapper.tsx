'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

const FramerMotionWrapper = ({ children }: { children: ReactNode }) => {
    return <AnimatePresence mode='wait' initial={false}>{children}</AnimatePresence>;
};

export default FramerMotionWrapper;
