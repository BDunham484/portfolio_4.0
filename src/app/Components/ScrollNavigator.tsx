// src/components/ScrollNavigator.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../../context/ActiveSectionContext';

const routes = ['/', '/About', '/Projects', '/Resume', '/Contact']; // adjust these to match your routes

export default function ScrollNavigator() {
    const router = useRouter();
    const pathname = usePathname();
    const { setActiveSection } = useActiveSection();

    // Determine the starting index from the current pathname.
    const initialIndex = routes.findIndex((r) => r === pathname) || 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    // A flag to debounce scrolling.
    const isScrollingRef = useRef(false);

    // changelog-start
    useEffect(() => {
        // changelog-start
        console.log('🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙🌙 SCROLNAVIGATOR: ');
        console.log('🌙🌙🌙🌙 routes[activeIndex]: ', routes[activeIndex]);
        console.log('🌙🌙🌙🌙 routes: ', routes);
        console.log('🌙🌙🌙🌙 activeIndex: ', activeIndex);
        console.log('🌙🌙🌙🌙 router: ', router);
        console.log(' ');
        // changelog-end
        if (isScrollingRef.current && routes[activeIndex]) {
            // When activeIndex changes, update both the active section context and the route.
            setActiveSection(routes[activeIndex].replace('/', '') || '/');
            if (routes[activeIndex] !== pathname) {
                router.push(routes[activeIndex]);
            }
        }
    }, [
        activeIndex,
        pathname,
        router,
        setActiveSection,
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

    return null; // This component doesn't render anything visible.
}
