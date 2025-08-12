'use client';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

interface SpaceInvadersContextProps {
    gridRef: React.RefObject<HTMLDivElement | null>;
    gridSize: {
        width: number;
        height: number;
    } | null;
    numRowsCols: {
        rows: number;
        cols: number;
    };
    setNumRowsCols: React.Dispatch<React.SetStateAction<{
        rows: number;
        cols: number;
    }>>;
}

const SpaceInvadersContext = createContext<SpaceInvadersContextProps | undefined>(undefined);

export const SpaceInvadersProvider = ({ children }: { children: ReactNode }) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [gridSize, setGridSize] = useState<{ width: number; height: number } | null>(null);
    const [numRowsCols, setNumRowsCols] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });

    useEffect(() => {
        if (gridRef.current) {
            const { width, height } = gridRef.current.getBoundingClientRect();
            setGridSize({ width, height });
        }
    }, []);

    useEffect(() => {
        // changelog-start
        console.log('🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇');
        console.log('🦇🦇🦇🦇 gridSize: ', gridSize);
        // changelog-end
        if (!gridSize) return;

        // Calculate number of squares per row/column to fill container exactly
        // Try to keep squares as close to 50px as possible, but fill container exactly
        const idealSquare = 50;
        let cols = Math.max(2, Math.round(gridSize.width / idealSquare));
        let rows = Math.max(2, Math.round(gridSize.height / idealSquare));

        // Adjust so squares fit exactly (no leftover space)
        cols = Math.max(2, Math.round(gridSize.width / Math.round(gridSize.width / cols)));
        rows = Math.max(2, Math.round(gridSize.height / Math.round(gridSize.height / rows)));

        // changelog-start
        console.log('🦇🦇🦇🦇 rows: ', rows);
        console.log('🦇🦇🦇🦇 cols: ', cols);
        console.log('🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇🦇');
        console.log(' ');
        // changelog-end

        setNumRowsCols({ rows, cols });
    }, [gridSize]);

    return (
        <SpaceInvadersContext.Provider value={{ gridRef, gridSize, numRowsCols, setNumRowsCols }}>
            {children}
        </SpaceInvadersContext.Provider>
    );
};

export const useSpaceInvaders = () => {
    const context = useContext(SpaceInvadersContext);
    if (!context) {
        throw new Error('useSpaceInvaders must be used within a SpaceInvadersProvider');
    }
    return context;
};