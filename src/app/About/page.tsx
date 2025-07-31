'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';

const About = () => {
    const { ref } = useSectionInView(0.6);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [gridSize, setGridSize] = useState<{ width: number; height: number } | null>(null);
    const [numRowsCols, setNumRowsCols] = useState<{ rows: number; cols: number }>({ rows: 13, cols: 31 });
    const [deadAliens, setDeadAliens] = useState<number[]>([]);

    const {
        gridSquares,
        motionSection,
        gridContainer,
        deadGridSquare,
    } = styles;

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
    const [playerOneIndex, setPlayerOneIndex] = useState<number>(playerOneStartingPosition);


    // Calculate exact square size to fill container with no gaps
    const squareWidth = gridSize ? gridSize.width / numRowsCols.cols : 50;
    const squareHeight = gridSize ? gridSize.height / numRowsCols.rows : 50;

    // changelog-start
    const numberOfSquaresInARowThatHasAnAlien = numRowsCols.cols * .6667;
    const numberOfSquaresInARowThatWontHaveAnAlien = Math.floor(numRowsCols.cols * .3333);
    // Get 1/3 of available cols in a row, rounded down to the nearest whole number
    const firstIndexOfFirstRowThatAliensAreIn = (Math.floor(numRowsCols.cols * .3333) % 2) === 0
        ? Math.floor(numRowsCols.cols * .3333) / 2
        : (Math.floor(numRowsCols.cols * .3333) + 1) / 2;

    const alienIndexes = Array.from({ length: (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 5 }, (_, index) => {
        {
            // const arrayLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 4;
            const rowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien);
            const firstRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien);
            const secondeRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 2;
            const thirdRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 3;
            const fourthRowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien) * 4;

            console.log('🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣');
            console.log('🍣🍣🍣🍣 index: ', index);
            console.log('🍣🍣🍣🍣 2ndRow: ', numRowsCols.cols + firstIndexOfFirstRowThatAliensAreIn + 1);
            console.log('🍣🍣🍣🍣 firstRowLength: ', firstRowLength);
            console.log('🍣🍣🍣🍣 secondeRowLength: ', secondeRowLength);
            console.log('🍣🍣🍣🍣 thirdRowLength: ', thirdRowLength);
            console.log('🍣🍣🍣🍣 fourthRowLength: ', fourthRowLength);
            console.log('🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣🍣');
            console.log(' ');
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
            }
        }
    });
    // changelog-end

    const squares = Array.from({ length: numRowsCols.rows * numRowsCols.cols }, (_, index) => {
        if (alienIndexes.includes(index)) {
            return (
                <div
                    key={index}
                    className={gridSquares}
                    style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                    onClick={() => setDeadAliens((prev) => [...prev, index])}
                >
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px',
                    }}>👾</span>
                </div>
            );
        } else {
            return (
                <div
                    key={index}
                    className={gridSquares}
                    style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                />
            );
        }
    });

    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log('👾👾👾👾 squares: ', squares);
    console.log('👾👾👾👾 gridSize: ', gridSize);
    console.log('👾👾👾👾 squareWidth: ', squareWidth);
    console.log('👾👾👾👾 squareHeight: ', squareHeight);
    console.log('👾👾👾👾 numRowsCols: ', numRowsCols);
    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log(' ');
    console.log('🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻');
    console.log('🩻🩻🩻🩻 numberOfSquaresInARowThatHasAnAlien: ', numberOfSquaresInARowThatHasAnAlien);
    console.log('🩻🩻🩻🩻 numberOfSquaresInARowThatWontHaveAnAlien: ', numberOfSquaresInARowThatWontHaveAnAlien);
    console.log('🩻🩻🩻🩻 Add thos two: ', numberOfSquaresInARowThatWontHaveAnAlien + numberOfSquaresInARowThatHasAnAlien);
    console.log('🩻🩻🩻🩻 firstIndexOfFirstRowThatAliensAreIn: ', firstIndexOfFirstRowThatAliensAreIn);
    console.log('🩻🩻🩻🩻 alienIndexes: ', alienIndexes);
    console.log('🩻🩻🩻🩻 playerOneStartingPosition: ', playerOneStartingPosition);
    console.log('🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻');
    console.log(' ');

    useEffect(() => {
        const readyPlayerOne = (event: KeyboardEvent) => {
            const rowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien);

            switch (event.key) {
                case 'ArrowLeft':
                    // changelog-start
                    if (playerOneIndex % numRowsCols.cols !== 0) {
                    // if (playerOneIndex > 0) {
                        // changelog-end
                        setPlayerOneIndex((prev) => prev - 1);
                    }
                    break;
                case 'ArrowRight':
                    // changelog-start
                    if (playerOneIndex % numRowsCols.cols < numRowsCols.cols - 1) {
                    // if (playerOneIndex < squares.length - 1) {
                        // changelog-end
                        setPlayerOneIndex((prev) => prev + 1);
                    }
                    break;
                case 'ArrowUp':
                    if (playerOneIndex - numRowsCols.cols >= 0) {
                        setPlayerOneIndex((prev) => prev - numRowsCols.cols);
                    }
                    break;
                case 'ArrowDown':
                    if (playerOneIndex + numRowsCols.cols < squares.length) {
                        setPlayerOneIndex((prev) => prev + numRowsCols.cols);
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', readyPlayerOne);
        return () => {
            document.removeEventListener('keydown', readyPlayerOne);
        };
    }, [numRowsCols.cols, playerOneIndex, squares.length, numberOfSquaresInARowThatWontHaveAnAlien]);

    // const remove = () => {

    // };


    // const moveInvaders = () => {
    //     const leftEdge = playerOneIndex % numRowsCols.cols === 0;
    //     const rightEdge = playerOneIndex % numRowsCols.cols === numRowsCols.cols - 1;
    //     const bottomEdge = playerOneIndex >= (numRowsCols.rows - 1) * numRowsCols.cols;


    // };

    return (
        <motion.section
            key='About'
            ref={ref}
            className={motionSection}
        >
            <div
                ref={gridRef}
                className={gridContainer}
            >
                {squares.map((square, index) => {
                    if (index === playerOneIndex) {
                        return (
                            <div
                                key={'square-' + square.key}
                                style={{ width: squareWidth, height: squareHeight, background: 'transparent' }}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    fontSize: '60px',
                                }}>{'🛸'}</span>
                            </div>
                        );
                    }

                    return (
                        <div key={'square-' + square.key} style={{
                            display: 'flex',
                        }}>
                            {/* <div key={'square-' + square.key} style={{ display: 'inline-block' }}> */}
                            {deadAliens.includes(index) ? (
                                <div style={{ width: squareWidth, height: squareHeight, background: 'transparent' }} />
                            ) : square}
                        </div>

                    );
                })}
            </div>
        </motion.section>
    );
};

export default About;