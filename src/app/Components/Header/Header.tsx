'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';
// changelog-start
// import { useActiveSection } from '../../../context/ActiveSectionContext';
// changelog-end
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
    const [activeLink, setActiveLink] = useState<string>('');
    const initialIndex = routes.findIndex((r) => r === pathname) || 0;
    const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
    // changelog-start
    // const { activeSectionRef } = useActiveSection();
    // chagnelog-end

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

    const onLinkClick = useCallback((label: string, index: number) => {
        // changelog-start
        // activeSectionRef.current = label;
        // chagnelog-end
        setActiveLink(label);
        setActiveIndex(index);
    }, []);

    return (
        <header className={header}>
            <div onClick={closeMobileMenu}>
                <h1>
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
                                onClick={() => onLinkClick(label, index + 1)}
                                className={activeLink === label ? navActive : navLink}
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
                setActiveLink={setActiveLink}
            />
        </header>
    );
};

export default Header;
