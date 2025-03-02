'use client';
import { createContext, ReactNode, RefObject, useContext, useRef, useState } from 'react';

type ActiveSectionContextType = {
    activeSectionRef: RefObject<string>;
    activeSection: string;
    setActiveSection: (value: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState('');
    const activeSectionRef = useRef('');

    return (
        <ActiveSectionContext.Provider
            value={{ activeSectionRef, activeSection, setActiveSection }}
        >
            {children}
        </ActiveSectionContext.Provider>
    );
};

export const useActiveSection = (): ActiveSectionContextType => {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error('useActiveSection must be used within an ActiveSectionProvider');
    }
    return context;
};
