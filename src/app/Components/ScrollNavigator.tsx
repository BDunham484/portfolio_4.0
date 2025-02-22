// src/components/ScrollNavigator.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../../context/ActiveSectionContext';

const routes = ['/', '/About', '/Projects', '/Resume', '/Contact']; // adjust these to match your routes

export default function ScrollNavigator() {
    const router = useRouter();
    const pathname = usePathname();
    const {
        activeIndex,
        setActiveSection,
        setActiveIndex,
    } = useActiveSection();

    // Determine the starting index from the current pathname.
    const initialIndex = routes.findIndex((r) => r === pathname) || 0;
    const [localIndex, setLocalIndex] = useState(initialIndex);

    // A flag to debounce scrolling.
    const isScrollingRef = useRef(false);

    useEffect(() => {
        if (!isScrollingRef.current) {
            setLocalIndex(activeIndex);
        } else if (localIndex !== activeIndex && routes[localIndex]) {
            setActiveIndex(localIndex);
            // When localIndex changes, update both the active section context and the route.
            setActiveSection(routes[localIndex].replace('/', '') || 'Home'); // e.g. 'about'
            if (routes[localIndex] !== pathname) {
                router.push(routes[localIndex]);
            }
        }
    }, [
        localIndex,
        activeIndex,
        pathname,
        router,
        setActiveIndex,
        setActiveSection
    ]);

    const handleWheel = (e: WheelEvent) => {
        if (isScrollingRef.current) return;
        // Customize the threshold as needed.
        const threshold = 50;
        if (e.deltaY > threshold && localIndex < routes.length - 1) {
            isScrollingRef.current = true;
            setLocalIndex((prev) => prev + 1);
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800); // adjust delay for smoother transitions
        } else if (e.deltaY < -threshold && localIndex > 0) {
            isScrollingRef.current = true;
            setLocalIndex((prev) => prev - 1);
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 800);
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [localIndex]);

    return null; // This component doesn't render anything visible.
}
