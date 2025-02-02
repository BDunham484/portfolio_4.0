'use client';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
    const {
        navActive,
        navMobileLinks,
        MobileNavigation,
        Navigation,
        hamburger,
    } = styles;
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const hamburgerIcon = (
        <VscMenu
            id={hamburger}
            onClick={() => setIsMenuOpen(prevState => !prevState)}
        />
    );

    const closeIcon = (
        <VscChromeClose
            id={hamburger}
            onClick={() => setIsMenuOpen(prevState => !prevState)}
        />
    );

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

    return (
        <header>
            <div>
                <h1>
                    <Link href='/'>
                        Brad Dunham
                    </Link>
                </h1>
                <p>
                    Developer
                </p>
            </div>
            <nav id={Navigation}>
                <ul>
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} className={pathname === href ? navActive : ''}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            < nav id={MobileNavigation}>
                {isMenuOpen ? closeIcon : hamburgerIcon}
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
                    </ul>}
            </nav >
        </header>
    );
};

export default Header;
