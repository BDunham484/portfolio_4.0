'use client';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useRef } from 'react';

interface IProps {
    routes: string[];
    pathname: string;
    activeIndex: number;
    setActiveIndex: (value: SetStateAction<number>) => void;
}

export default function ScrollNavigator({
    routes,
    pathname,
    activeIndex,
    setActiveIndex,
}: IProps) {
    const router = useRouter();

    // A flag to debounce scrolling.
    const isScrollingRef = useRef(false);

    useEffect(() => {
        if (isScrollingRef.current && routes[activeIndex]) {
            if (routes[activeIndex] !== pathname) {
                // changelog-start
                router.push(routes[activeIndex]);
                // setTimeout(() => router.push(routes[activeIndex] ?? '/'), 5000);
                // changelog-end
            }
        }
    }, [
        activeIndex,
        pathname,
        router,
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
