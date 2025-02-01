'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
// import { useCallback, useState } from 'react';
// import { VscChromeClose, VscMenu } from 'react-icons/vsc';

const Header = () => {
    const {
        navActive,
        // navMobileLinks,
        // MobileNavigation,
        // Navigation,
    } = styles;
    const pathname = usePathname();
    // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    // const hamburgerIcon = <VscMenu id='hamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    // const closeIcon = <VscChromeClose id='closeHamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    // const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);
    // const animateFrom = { opacity: 0, y: -80 };
    // const animateTo = { opacity: 1, y: 0 };
    const links = [
        { href: '/About', label: 'About' },
        { href: '/Projects', label: 'Projects' },
        { href: '/Resume', label: 'Resume' },
        { href: '/Contact', label: 'Contact' },
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
            <nav>
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
        </header>
    );
};

export default Header;
