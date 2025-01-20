'use client';
import { useCallback, useState } from 'react';
import { VscChromeClose, VscMenu } from 'react-icons/vsc';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const hamburgerIcon = <VscMenu id='hamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    const closeIcon = <VscChromeClose id='closeHamburger' onClick={() => setIsMenuOpen(prevState => !prevState)} />;
    const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);
    const animateFrom = { opacity: 0, y: -80 };
    const animateTo = { opacity: 1, y: 0 };

    return (
        <header>
            <div>
                <h1>
                    <a href="#">
                        Brad Dunham
                    </a>
                </h1>
                <p>
                    Dev
                </p>
            </div>
            <nav>
                <ul>
                    
                </ul>
            </nav>
        </header>
    );
};

export default Header;
