'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../context/ActiveSectionContext';
import { useSectionInView } from '../hooks/useSectionInView';
import useWindowSize from '../hooks/useWindowSize';
import styles from './page.module.css';

const Home = () => {
  const [upperValue, setUpperValue] = useState<number>(0);
  const [lowerValue, setLowerValue] = useState<number>(0);
  const MotionImage = motion(Image);
  const baseTriangleRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useSectionInView(0.6);
  const { setActiveSection } = useActiveSection();
  const { width, height } = useWindowSize();
  const ratio = width / height;

  const {
    // hero,
    imageContainer,
    triangleWrapper,
    upperTriangleWrapper,
    lowerTriangleWrapper,
    baseTriangle,
    upperTriangle,
    lowerTriangle,
    cometWrapper,
  } = styles;

  useEffect(() => {
    if (inView) {
      setActiveSection('Home');
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (baseTriangleRef.current) {
      const { height } = baseTriangleRef.current.getBoundingClientRect();
      setUpperValue((height * .15));
      setLowerValue((height * .25));
    }
  }, [baseTriangleRef, upperValue, lowerValue]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <div className={imageContainer}>
        <AnimatePresence mode='wait'>
          <div className={triangleWrapper} ref={baseTriangleRef}>
            <MotionImage
              key='baseTriangle'
              className={baseTriangle}
              src='/assets/images/textured-triangle.png'
              alt='large dark triangle with golden border'
              priority
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              fill
            />
          </div>
          <div
            className={upperTriangleWrapper}
            style={{ top: `calc(50% + ${upperValue}px)` }}
          >
            <MotionImage
              key='upperTriangle'
              className={upperTriangle}
              src='/assets/images/antique-white-triangle.png'
              alt='clear triangle with a thin golden border pointing down'
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 2, delay: 1.2 }}
              priority
              fill
            />
          </div>
          <div
            className={lowerTriangleWrapper}
            style={{ top: `calc(50% + ${lowerValue}px)` }}
          >
            <MotionImage
              key='lowerTriangle'
              className={lowerTriangle}
              src='/assets/images/antique-white-triangle.png'
              alt='clear triangle with a thin golden border pointing down'
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 2, delay: 1.5 }}
              priority
              fill
            />
          </div>
        </AnimatePresence>
        <div className={cometWrapper}>
          <MotionImage
            src="https://www.freeiconspng.com/thumbs/comet/comet-transparent-background-image-11.png"
            alt="a comet"
            width={75}
            height={45}
            priority
            initial={{ x: '100vw', y: '0vh', opacity: .25, rotate: ratio < 1 ? -25 : 5 }}
            animate={{ x: '-10vw', y: '95vh', opacity: 1, rotate: ratio < 1 ? -25 : 5 }}
            transition={{ duration: 0.65, delay: 4 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
