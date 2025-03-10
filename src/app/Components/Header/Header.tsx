'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';
import ScrollNavigator from '../ScrollNavigator';
import styles from './Header.module.css';

const routes = ['/', '/About', '/Projects', '/Resume', '/Contact'];

const Header = () => {
    const {
        header,
        navLink,
        navActive,
        navMobileLinks,
        mobileNav,
        nav,
        hamburger,
    } = styles;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const initialIndex = routes.findIndex((r) => r === pathname) || 0;
    const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
    const router = useRouter();

    const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);

    const animateFrom = { opacity: 0, y: -80 };
    const animateTo = { opacity: 1, y: 0 };

    const links = [
        { href: '/About', label: 'About' },
        { href: '/Projects', label: 'Projects' },
        { href: '/Resume', label: 'Resume' },
        { href: '/Contact', label: 'Contact' },
    ];

    const mobileLinks = [
        { href: '/About', label: 'About', delay: 0.05 },
        { href: '/Projects', label: 'Projects', delay: 0.10 },
        { href: '/Resume', label: 'Resume', delay: 0.20 },
        { href: '/Contact', label: 'Contact', delay: 0.30 },
    ];

    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // changelog-start
    // const onLinkClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string, index: number) => {
    //     e.preventDefault();

    //     await sleep(2000);

    //     router.push(href);
    //     setActiveIndex(index);

    //     await sleep(2000);
    // }, [router]);
    const onLinkClick = useCallback((label: string, index: number) => {
        setActiveIndex(index);
    }, []);
    // changelog=end

    return (
        <header className={header}>
            <div onClick={closeMobileMenu}>
                <h1>
                    {/* <Link href='/' onClick={(e) => onLinkClick(e, '/', 0)}> */}
                    <Link href='/' onClick={() => onLinkClick('/', 0)}>
                        Brad Dunham
                    </Link>
                </h1>
                <p>
                    Developer
                </p>
            </div>
            <nav className={nav}>
                <ul>
                    {links.map(({ href, label }, index) => (
                        <li key={href}>
                            <Link
                                href={href}
                                // onClick={(e) => onLinkClick(e, href, index + 1)}
                                onClick={() => onLinkClick(href, index + 1)}
                                className={activeIndex === (index + 1) ? navActive : navLink}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className={mobileNav}>
                <button
                    className={hamburger}
                    onClick={() => setIsMenuOpen(prevState => !prevState)}
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    {isMenuOpen ? <VscChromeClose /> : <VscMenu />}
                </button>
                {isMenuOpen &&
                    <ul>
                        {mobileLinks.map(({ href, label, delay }) => (
                            <motion.li
                                key={href}
                                initial={animateFrom}
                                animate={animateTo}
                                transition={{ delay }}
                                onClick={closeMobileMenu}
                            >
                                <Link href={href} className={navMobileLinks}>
                                    {label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                }
            </nav >
            <ScrollNavigator
                routes={routes}
                pathname={pathname}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
        </header>
    );
};

export default Header;
