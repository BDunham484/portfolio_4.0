'use client';
import { motion } from 'framer-motion';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useSpaceInvaders } from '../../context/SpaceInvadersContext';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';

const About = () => {
    const {
        gridSize,
        numRowsCols,
        alienIndexes,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        playerOneStartingPosition,
        squares,
        deadAliens,
        setDeadAliens,
        squareWidth,
        squareHeight,
    } = useSpaceInvaders();
    const { ref } = useSectionInView(0.6);
    const movingLeft = useRef<boolean>(true);
    // const alienIndexRef = useRef<number[]>([]);
    // const squaresRef = useRef<JSX.Element[] | undefined>([]);
    const playerEngagedRef = useRef<boolean>(false);
    const leftDownShifts = useRef<number>(1);
    const rightDownShifts = useRef<number>(7);

    const {
        gridSquares,
        motionSection,
        gridContainer,
        deadGridSquare,
    } = styles;

    const [playerOneIndex, setPlayerOneIndex] = useState<number>(playerOneStartingPosition);
    const [alienLocation, setAlienLocation] = useState<number[]>(alienIndexes);
    const [gridState, setGridState] = useState<JSX.Element[]>(squares);

    useEffect(() => {
        if ((squares && squares.length > 0) && gridState.length !== squares.length) {
            setGridState(squares);
        }
    }, [squares, gridState.length]);

    useEffect(() => {
        if ((alienIndexes && alienIndexes.length > 0) && alienLocation.length !== alienIndexes.length) {
            setAlienLocation(alienIndexes);
        }
    }, [alienIndexes, alienLocation.length]);

    useEffect(() => {
        if (!playerEngagedRef.current && playerOneStartingPosition !== playerOneIndex) {
            setPlayerOneIndex(playerOneStartingPosition);
        }
    }, [playerOneStartingPosition, playerOneIndex]);

    const moveInvaders = useCallback(() => {
        const leftEdge = (alienLocation[0] ?? firstIndexOfFirstRowThatAliensAreIn) % numRowsCols.cols === 0;
        // const leftEdge = firstIndexOfFirstRowThatAliensAreIn % numRowsCols.cols === 0;
        const rightEdge = (alienLocation[alienLocation?.length - 1] ?? rowLength - 1) % numRowsCols.cols === numRowsCols.cols - 1;
        // const bottomEdge = playerOneIndex >= (numRowsCols.rows - 1) * numRowsCols.cols;

        if (!alienIndexes || alienIndexes.length === 0) {
            return;
        }

        setAlienLocation(prevAlienLocation => {
            let newAlienIndexes = [...prevAlienLocation];

            newAlienIndexes = newAlienIndexes.map((alienIndex, index, thisAliensArray) => {
                if (!leftEdge && movingLeft.current) {
                    return alienIndex - 1;
                } else if (leftEdge && movingLeft.current) {
                    if (index === 0 && alienIndex === numRowsCols.cols * leftDownShifts.current) {
                        leftDownShifts.current += 2;
                        movingLeft.current = false;
                    }
                    return (alienIndex + numRowsCols.cols);
                } else if (!rightEdge && !movingLeft.current) {
                    return alienIndex + 1;
                } else if (rightEdge && !movingLeft.current) {
                    if (index === alienIndexes.length - 1 && alienIndex === ((numRowsCols.cols * rightDownShifts.current) - 1)) {
                        rightDownShifts.current += 2;
                        movingLeft.current = true;
                    }
                    return (alienIndex + numRowsCols.cols);
                }
                return alienIndex;
            });

            return newAlienIndexes;
        });

        setGridState((prevState) => {
            let newState: JSX.Element[] = [...prevState];

            newState = newState.map((square, index) => {
                if (alienLocation.includes(index)) {
                    return (
                        <div
                            key={'alien' + index}
                            className={gridSquares}
                            style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                            onClick={() => setDeadAliens((prev) => [...prev, index])}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                                // }}>{index}</span>
                            }}>👾</span>
                        </div>
                    );
                } else if (deadAliens.includes(index)) {
                    return (
                        <div
                            key={'deadAlien' + index}
                            className={deadGridSquare}
                            style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                        />
                    );
                } else {
                    return (
                        // <div
                        //     key={'empty' + index}
                        //     className={gridSquares}
                        //     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                        // >{index}</div>
                        <div
                            key={'empty' + index}
                            className={gridSquares}
                            style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
                        />
                    );
                }
            });

            return newState;
        });
    }, [
        alienIndexes,
        numRowsCols.cols,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        gridSquares,
        squareWidth,
        squareHeight,
        deadAliens,
        setDeadAliens,
        deadGridSquare,
        alienLocation,
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            moveInvaders();
        }, 1000);

        return () => clearInterval(interval);
    }, [alienIndexes, moveInvaders]);

    useEffect(() => {
        const readyPlayerOne = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (playerOneIndex % numRowsCols.cols !== 0) {
                        playerEngagedRef.current = true;
                        setPlayerOneIndex((prev) => prev - 1);
                    }
                    break;
                case 'ArrowRight':
                    if (playerOneIndex % numRowsCols.cols < numRowsCols.cols - 1) {
                        playerEngagedRef.current = true;
                        setPlayerOneIndex((prev) => prev + 1);
                    }
                    break;
                case 'ArrowDown':
                    moveInvaders();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', readyPlayerOne);
        return () => {
            document.removeEventListener('keydown', readyPlayerOne);
        };
    }, [
        numRowsCols.cols,
        playerOneIndex,
        squares.length,
        moveInvaders,
    ]);

    return (
        <motion.section
            key='About'
            ref={ref}
            className={motionSection}
        >
            <div
                // ref={gridRef}
                className={gridContainer}
            >
                {gridState.map((square, index) => {
                    {/* {squares.map((square, index) => { */ }
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