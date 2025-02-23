'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type ActiveSectionContextType = {
    activeSection: string;
    setActiveSection: (section: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('');
    // changelog-start
    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾 ActiveSectionContext: ');
    console.log('👾👾👾👾 activeSection: ', activeSection);
    console.log(' ');
    // changelog-end

    return (
        <ActiveSectionContext.Provider
            value={{ activeSection, setActiveSection }}
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
