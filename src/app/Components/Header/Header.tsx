'use client';
import Link from 'next/link';
import styles from './Header.module.css';
// import { useCallback, useState } from 'react';
// import { VscChromeClose, VscMenu } from 'react-icons/vsc';

const Header = () => {
    const {
        navActive,
        navMobileLinks,
        MobileNavigation,
        Navigation,
    } = styles;
    // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    // const hamburgerIcon = <VscMenu id='hamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    // const closeIcon = <VscChromeClose id='closeHamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    // const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);
    // const animateFrom = { opacity: 0, y: -80 };
    // const animateTo = { opacity: 1, y: 0 };

    return (
        <header>
            <div>
                <h1>
                    <a href='#'>
                        Brad Dunham
                    </a>
                </h1>
                <p>
                    Developer
                </p>
            </div>
            <nav>
                <ul>
                    <li><Link href='#'>About</Link></li>
                    <li><Link href='#'>Projects</Link></li>
                    <li><Link href='#'>Resume</Link></li>
                    <li><Link href='#'>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
