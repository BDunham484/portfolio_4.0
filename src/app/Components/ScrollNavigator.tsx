'use client';
import { useActiveSection } from '../../context/ActiveSectionContext';
import { SetStateAction, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface IProps {
    routes: string[];
    pathname: string;
    activeIndex: number;
    setActiveIndex: (value: SetStateAction<number>) => void;
    setActiveLink: (value: SetStateAction<string>) => void;
}

export default function ScrollNavigator({
    routes,
    pathname,
    activeIndex,
    setActiveIndex,
    setActiveLink,
}: IProps) {
    const router = useRouter();
    const { activeSectionRef } = useActiveSection();

    // A flag to debounce scrolling.
    const isScrollingRef = useRef(false);

    useEffect(() => {
        if (isScrollingRef.current && routes[activeIndex]) {
            // When activeIndex changes, update both the active section context and the route.
            activeSectionRef.current = (routes[activeIndex].replace('/', '') || '/');
            if (setActiveLink) {
                setActiveLink(routes[activeIndex].replace('/', '') || '/');
            }
            if (routes[activeIndex] !== pathname) {
                router.push(routes[activeIndex]);
            }
        }
    }, [
        activeIndex,
        pathname,
        router,
        activeSectionRef,
        setActiveLink,
        routes,
    ]);

    const handleWheel = (e: WheelEvent) => {
        if (isScrollingRef.current) return;
        // Customize the threshold as needed.
        const threshold = 50;
        if (e.deltaY > threshold && activeIndex < routes.length - 1) {
            isScrollingRef.current = true;
            setActiveIndex((prev) => prev + 1);
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800); // adjust delay for smoother transitions
        } else if (e.deltaY < -threshold && activeIndex > 0) {
            isScrollingRef.current = true;
            setActiveIndex((prev) => prev - 1);
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800);
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [activeIndex]);

    return null;
}
