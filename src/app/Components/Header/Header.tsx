'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';
import { useActiveSection } from '../../../context/ActiveSectionContext';
import DelayedLink from '../DelayedLink';
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
    const {
        activeSection,
        setActiveSection,
        setActiveIndex,
    } = useActiveSection();
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

    const onLinkClick = useCallback((label: string, index: number) => {
        setActiveSection(label);
        setActiveIndex(index);
    }, [setActiveIndex, setActiveSection]);

    return (
        <header className={header}>
            <div onClick={closeMobileMenu}>
                <h1>
                    {/* <Link
                        href='/'
                        onClick={() => onLinkClick('/', 0)}
                        // onClick={() => {
                        //     setActiveSection('/');
                        //     setActiveIndex(0);
                        // }}
                        >
                        Brad Dunham
                    </Link> */}
                    <DelayedLink
                        href='/'
                        index={0}
                        label='/'
                        onClick={onLinkClick}
                    >
                        Brad Dunham
                    </DelayedLink>
                </h1>
                <p>
                    Developer
                </p>
            </div>
            <nav className={nav}>
                <ul>
                    {links.map(({ href, label }, index) => (
                        <li key={href + index}>
                            {/* // changelog-start */}
                            <DelayedLink
                                href={href}
                                index={index + 1}
                                label={label}
                                onClick={onLinkClick}
                                className={activeSection === label ? navActive : navLink}
                            >
                                {label}
                            </DelayedLink>
                            {/* <Link
                                href={href}
                                onClick={() => onLinkClick(label, index + 1)}
                                // onClick={() => {
                                //     setActiveSection(label);
                                //     setActiveIndex(index + 1);
                                // }}
                                // changelog-start
                                className={activeSection === label ? navActive : navLink}
                            // className={pathname === href ? navActive : navLink}
                            // changelog-end
                            >
                                {label}
                            </Link> */}
                            {/* // chagnelog-end */}
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
                        {mobileLinks.map(({ href, label, delay }, index) => (
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
