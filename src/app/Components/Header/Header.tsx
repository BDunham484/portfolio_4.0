'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';
import { useActiveSection } from '../../../context/ActiveSectionContext';
import styles from './Header.module.css';

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
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { activeSection, setActiveSection } = useActiveSection();
    // const pathname = usePathname();

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

    // const onLinkClick = useCallback((label: string, index: number) => {
    //     setActiveSection(label);
    //     setActiveIndex(index);
    // }, [setActiveIndex, setActiveSection]);

    // changelog-start
    console.log('🌌🌌🌌🌌🌌🌌🌌🌌🌌🌌🌌🌌🌌🌌 Header.tsx: ');
    console.log('🌌🌌🌌🌌 activeSection: ', activeSection);
    console.log(' ');
    // changelog=end

    return (
        <header className={header}>
            <div onClick={closeMobileMenu}>
                <h1>
                    <Link href='/' onClick={() => setActiveSection('/')}>
                        Brad Dunham
                    </Link>
                </h1>
                <p>
                    Developer
                </p>
            </div>
            <nav className={nav}>
                <ul>
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                onClick={() => setActiveSection(label)}
                                // changelog-start
                                className={activeSection === label ? navActive : navLink}
                            // className={pathname === href ? navActive : navLink}
                            // changelog-end
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
        </header>
    );
};

export default Header;
