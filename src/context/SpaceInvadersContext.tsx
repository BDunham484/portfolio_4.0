'use client';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from '../app/About/About.module.css';
import NodeJsInvader from '../app/About/NodeJSInvader';

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
    alienIndexes: number[];
    firstIndexOfFirstRowThatAliensAreIn: number;
    rowLength: number;
    playerOneStartingPosition: number;
    squares: React.JSX.Element[];
    deadAliens: number[];
    setDeadAliens: React.Dispatch<React.SetStateAction<number[]>>;
    squareWidth: number;
    squareHeight: number;
}

const SpaceInvadersContext = createContext<SpaceInvadersContextProps | undefined>(undefined);

export const SpaceInvadersProvider = ({ children }: { children: ReactNode }) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [gridSize, setGridSize] = useState<{ width: number; height: number } | null>(null);
    const [numRowsCols, setNumRowsCols] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });
    const [deadAliens, setDeadAliens] = useState<number[]>([]);
    const { gridSquares } = styles;

    useEffect(() => {
        if (gridRef.current) {
            const { width, height } = gridRef.current.getBoundingClientRect();
            setGridSize({ width, height });
        }
    }, []);

    useEffect(() => {
        if (!gridSize) return;

        // Calculate number of squares per row/column to fill container exactly
        // Try to keep squares as close to 50px as possible, but fill container exactly
        const idealSquare = 50;
        let cols = Math.max(2, Math.round(gridSize.width / idealSquare));
        let rows = Math.max(2, Math.round(gridSize.height / idealSquare));

        // Adjust so squares fit exactly (no leftover space)
        cols = Math.max(2, Math.round(gridSize.width / Math.round(gridSize.width / cols)));
        rows = Math.max(2, Math.round(gridSize.height / Math.round(gridSize.height / rows)));

        setNumRowsCols({ rows, cols });
    }, [gridSize]);

    const playerOneStartingPosition = numRowsCols.cols * (numRowsCols.rows - 2) + Math.floor(numRowsCols.cols / 2);
    const numberOfSquaresInARowThatWontHaveAnAlien = Math.floor(numRowsCols.cols * .3333);
    const firstIndexOfFirstRowThatAliensAreIn = (Math.floor(numRowsCols.cols * .3333) % 2) === 0
        ? Math.floor(numRowsCols.cols * .3333) / 2
        : (Math.floor(numRowsCols.cols * .3333) + 1) / 2;
    const rowLength = useMemo(() => (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien), [numRowsCols.cols, numberOfSquaresInARowThatWontHaveAnAlien]);
    // Calculate exact square size to fill container with no gaps
    const squareWidth = gridSize ? gridSize.width / numRowsCols.cols : 50;
    const squareHeight = gridSize ? gridSize.height / numRowsCols.rows : 50;


    /** Initial indexes of alien locations */
    const alienIndexes = Array.from({ length: (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 5 }, (_, index) => {
        const firstRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien);
        const secondeRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 2;
        const thirdRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 3;
        const fourthRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 4;

        if (index === 0) {
            return firstIndexOfFirstRowThatAliensAreIn;
        } else if (index > 0 && index <= (rowLength) - 1) {
            return firstIndexOfFirstRowThatAliensAreIn + index;
        } else if (index >= rowLength && (index <= ((rowLength * 2) - 1))) {
            return (numRowsCols.cols + firstIndexOfFirstRowThatAliensAreIn) + (index - firstRowLength);
        } else if (index >= rowLength * 2 && (index <= (rowLength * 3) - 1)) {
            return (numRowsCols.cols * 2 + firstIndexOfFirstRowThatAliensAreIn) + (index - secondeRowLength);
        } else if (index >= rowLength * 3 && (index <= (rowLength * 4) - 1)) {
            return (numRowsCols.cols * 3 + firstIndexOfFirstRowThatAliensAreIn) + (index - thirdRowLength);
        } else if (index >= rowLength * 4 && (index <= (rowLength * 5) - 1)) {
            return (numRowsCols.cols * 4 + firstIndexOfFirstRowThatAliensAreIn) + (index - fourthRowLength);
        } else {
            return -1;
        }
    });

    /** All of the grid squares created dynamically based on available viewport space. */
    const squares = useMemo(() => {
        return Array.from({ length: numRowsCols.rows * numRowsCols.cols }, (_, index) => {
            if (alienIndexes.includes(index)) {
                return (
                    <div
                        key={index}
                        className={gridSquares}
                        style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                        onClick={() => setDeadAliens((prev) => [...prev, index])}
                    >
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                            }}
                        >
                            <NodeJsInvader />
                            {/* <JavaScriptInvader /> */}
                            {/* <ReactInvader /> */}
                        </span>
                    </div>
                );
            } else {
                return (
                    // <div
                    //     key={index}
                    //     className={gridSquares}
                    //     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                    // >{index}</div>
                    <div
                        key={index}
                        className={gridSquares}
                        style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                    />
                );
            }
        });
    }, [
        numRowsCols.rows,
        numRowsCols.cols,
        alienIndexes,
        squareWidth,
        squareHeight,
        gridSquares
    ]);

    const contextValue = {
        gridRef,
        gridSize,
        numRowsCols,
        setNumRowsCols,
        alienIndexes,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        playerOneStartingPosition,
        squares,
        deadAliens,
        setDeadAliens,
        squareWidth,
        squareHeight,
    };

    return (
        <SpaceInvadersContext.Provider value={contextValue}>
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