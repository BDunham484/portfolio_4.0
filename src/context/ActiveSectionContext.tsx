'use client';
import { createContext, ReactNode, RefObject, SetStateAction, useCallback, useContext, useRef } from 'react';

type ActiveSectionContextType = {
    // activeSection: string;
    // setActiveSection: (section: string) => void;
    activeSectionRef: RefObject<string>;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
    // const [activeSection, setActiveSection] = useState<string>('');
    const activeSectionRef = useRef('');
    // changelog-start
    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾 ActiveSectionContext: ');
    // console.log('👾👾👾👾 activeSection: ', activeSection);
    console.log('👾👾👾👾 activeSectionRef: ', activeSectionRef.current);
    console.log(' ');
    // changelog-end

    return (
        <ActiveSectionContext.Provider
        // changelog-start
            value={{ activeSectionRef }}
            // value={{ activeSection, setActiveSection }}
            // changelog-end
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
