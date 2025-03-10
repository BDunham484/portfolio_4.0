'use client';
import { motion } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSectionInView } from '../hooks/useSectionInView';
import useWindowSize from '../hooks/useWindowSize';
import styles from './page.module.css';

const Home = () => {
  const [upperValue, setUpperValue] = useState<number>(0);
  const [lowerValue, setLowerValue] = useState<number>(0);
  const MotionImage = motion.create(Image);
  const baseTriangleRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useSectionInView(0.6);
  const { width, height } = useWindowSize();
  const ratio = width / height;
  const pathname = usePathname();
  const context = useContext(LayoutRouterContext);

  const {
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
    if (baseTriangleRef.current) {
      const { height } = baseTriangleRef.current.getBoundingClientRect();
      setUpperValue((height * .15));
      setLowerValue((height * .25));
    }
  }, [baseTriangleRef, upperValue, lowerValue]);

  const upperVariants = useMemo(() => ({
    initial: (context && (context.url === pathname)) ? { y: -100 } : { y: 0 },
    animate: (context && (context.url === pathname)) ? { y: 0 } : { y: 1000 },
    exit: { y: 1000, transition: { duration: 0.5 } },
  }), [context, pathname]);

  const lowerVariants = useMemo(() => ({
    initial: (context && (context.url === pathname)) ? { y: -150 } : { y: 0 },
    animate: (context && (context.url === pathname)) ? { y: 0 } : { y: 1000 },
    exit: { y: 1000, transition: { duration: 0.5 } },
  }), [context, pathname]);


  return (
    <motion.section
      key='Home'
      ref={ref}
      style={{ height: '100vh', width: '100vw' }}
    >
      <div className={imageContainer}>
        <div className={triangleWrapper} ref={baseTriangleRef}>
          <MotionImage
            key='baseTriangle'
            className={baseTriangle}
            src='/assets/images/textured-triangle.png'
            alt='large dark triangle with golden border'
            priority
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
            variants={upperVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: .75 }}
            // transition={{ duration: .75, delay: .5 }}
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
            variants={lowerVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 1.25 }}
            // transition={{ duration: 1, delay: .75 }}
            priority
            fill
          />
        </div>
        <div className={cometWrapper}>
          <MotionImage
            key='comet'
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
