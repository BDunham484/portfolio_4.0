'use client';
import Link from 'next/link';
import { FC } from 'react';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface DelayedLinkProps {
    href: string;
    index: number;
    label: string;
    onClick: (label: string, index: number) => void;
    children: React.ReactNode;
    className?: string;
}

const DelayedLink: FC<DelayedLinkProps> = ({
    href,
    index,
    label,
    onClick,
    children,
    className,
}) => {
    const delayedNavigate = useDelayedNavigation(6000); // delay in ms, adjust as needed

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // changelog-start
        onClick(label, index);
        // changelog-end
        // You might also trigger any exit animation state here
        delayedNavigate(href);
        
    };

    return (
        // changelog-start
        <Link
            href={href}
            onClick={handleClick}
            className={className}
        >
            {children}
        </Link>
        // <Link href={href} legacyBehavior>
        //     <a onClick={handleClick} className={className}>
        //         {children}
        //     </a>
        // </Link>
        // changelog-end
    );
};

export default DelayedLink;
