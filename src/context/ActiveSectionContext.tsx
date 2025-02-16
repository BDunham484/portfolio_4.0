'use client';
// src/context/ActiveSectionContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

type ActiveSectionContextType = {
    activeSection: string;
    activeIndex: number;
    setActiveSection: (section: string) => void;
    setActiveIndex: (index: number) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <ActiveSectionContext.Provider
            value={{ activeSection, activeIndex, setActiveSection, setActiveIndex }}
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
