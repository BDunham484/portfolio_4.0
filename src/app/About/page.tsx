'use client';
import { motion } from 'framer-motion';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useSpaceInvaders } from '../../context/SpaceInvadersContext';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';
import { useGameElements } from './hooks/useGameElements';

const About = () => {
    const {
        gridSize,
        numRowsCols,
        alienIndexes,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        playerOneStartingPosition,
        squares,
        // deadAliens,
        // setDeadAliens,
        squareWidth,
        squareHeight,
    } = useSpaceInvaders();
    const { ref } = useSectionInView(0.6);
    const movingLeft = useRef<boolean>(true);
    // const alienIndexRef = useRef<number[]>([]);
    // const squaresRef = useRef<JSX.Element[] | undefined>([]);
    const playerEngagedRef = useRef<boolean>(false);
    const downShift = useRef<boolean>(false);
    const leftDownShifts = useRef<number>(1);
    const numOfRowsOfAliens = 5;
    const rightDownShifts = useRef<number>(numOfRowsOfAliens + 2);
    const alienIndexCounter = useRef<number>(0);

    const {
        gridSquares,
        motionSection,
        gridContainer,
        deadGridSquare,
    } = styles;

    const [playerOneIndex, setPlayerOneIndex] = useState<number>(playerOneStartingPosition);
    const playerOneIndexRef = useRef<number>(playerOneStartingPosition);
    const moveAliensIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const runGridIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [alienLocation, setAlienLocation] = useState<number[]>(alienIndexes);
    const [gridState, setGridState] = useState<JSX.Element[]>(squares);
    const [laserBlasts, setLaserBlasts] = useState<number[]>([]);
    // const deadAliensRef = useRef<number[]>(deadAliens);
    const hitAlienRef = useRef<number>(-1);
    const laserShotsRef = useRef<number>(-1);

    const { createImpactElement, createLaserBlast, createAlienElement, createTheInfiniteVoidOfSpaceElement } = useGameElements({
        setAlienLocation,
        squareWidth,
        squareHeight,
        laserBlasts,
        laserShotsRef,
        hitAlienRef,
    });

    const shootLaser = useCallback(() => {
        setLaserBlasts((prevLaserShots) => [...prevLaserShots, playerOneIndexRef.current - numRowsCols.cols]);
    }, [numRowsCols.cols]);

    const laserMotion = useCallback(() => {
        if (!laserBlasts || laserBlasts.length === 0) return;

        setLaserBlasts((prevLaserShots) => {
            // const removeIndex = prevLaserShots.indexOf(laserShotsRef.current);
            let newLaserShots = [...prevLaserShots];
            // let newLaserShots = laserShotsRef.current < 0 ? [...prevLaserShots] : [...prevLaserShots.filter((shot) => shot !== laserShotsRef.current)];

            /** Move all current laser shots forward */
            newLaserShots = newLaserShots.map((laserShot) => laserShot - numRowsCols.cols).filter((laserShot) => laserShot >= 0);

            return newLaserShots;
        });
    }, [laserBlasts, numRowsCols.cols]);

    useEffect(() => {
        if (!laserBlasts || laserBlasts.length === 0) return;

        const interval = setInterval(() => {
            laserMotion();
        }, 100);

        return () => clearInterval(interval);
    }, [
        laserBlasts,
        laserMotion,
    ]);

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
            playerOneIndexRef.current = playerOneStartingPosition;
        }
    }, [playerOneStartingPosition, playerOneIndex]);

    const clearAlienInterval = useCallback(() => {
        if (moveAliensIntervalRef.current) {
            clearInterval(moveAliensIntervalRef.current);
            moveAliensIntervalRef.current = null;
        }
    }, []);

    const clearGridInterval = useCallback(() => {
        if (runGridIntervalRef.current) {
            clearInterval(runGridIntervalRef.current);
            runGridIntervalRef.current = null;
        }
    }, []);

    const getLeftmostAliveAlien = useCallback((alienLocation: number[], numRowsCols: { rows: number, cols: number }) => {
        const aliveAliens = alienLocation.filter(alien => alien >= 0);
        if (aliveAliens.length === 0) return -1;

        // Find the leftmost column that has any alive alien.
        let leftmostColumn = numRowsCols.cols; // Start with max possible column index
        aliveAliens.forEach(alien => {
            const col = alien % numRowsCols.cols;
            if (col < leftmostColumn) {
                leftmostColumn = col;
            }
        });

        return leftmostColumn;
    }, []);

    const getRightmostAliveAlien = (alienLocation: number[], numRowsCols: { rows: number, cols: number }) => {
        const aliveAliens = alienLocation.filter(alien => alien >= 0);
        if (aliveAliens.length === 0) return -1;

        // Find the rightmost column that has any alive alien
        let rightmostCol = -1;

        aliveAliens.forEach(alienIndex => {
            const col = alienIndex % numRowsCols.cols;
            if (col > rightmostCol) {
                rightmostCol = col;
            }
        });

        return rightmostCol;
    };

    const moveInvaders = useCallback(() => {
        const leftmostCol = getLeftmostAliveAlien(alienLocation, numRowsCols);
        const rightmostCol = getRightmostAliveAlien(alienLocation, numRowsCols);

        const leftEdge = leftmostCol === 0;
        const rightEdge = rightmostCol === numRowsCols.cols - 1;

        if (!alienIndexes || alienIndexes.length === 0) {
            return;
        }

        setAlienLocation(prevAlienLocation => {
            let tempAlienIndexes = [...prevAlienLocation];

            tempAlienIndexes = tempAlienIndexes.map((alienIndexValue, index, thisAliensArray) => {
                if (alienIndexValue === playerOneIndexRef.current) {
                    // Game over
                    clearAlienInterval();
                    /** If moving left and not at the left edge of the viewport, keep moving left. */
                } else if (!leftEdge && movingLeft.current) {
                    downShift.current = false;
                    // If not a hit alien (-1), move alien left.
                    return alienIndexValue >= 0 ? alienIndexValue - 1 : alienIndexValue;
                    /** If at the left edge and currently moving left, move down and change direction. */
                } else if (leftEdge && movingLeft.current) {
                    // If the full formation of aliens have moved down,
                    // increase the down shift count and move right.
                    if (alienIndexCounter.current === alienIndexes.length * 2) {
                        leftDownShifts.current += 2;
                        movingLeft.current = false;
                        alienIndexCounter.current = 0;
                    }
                    // Set downshift status.
                    downShift.current = true;
                    alienIndexCounter.current += 1;

                    // Downshift the alien location by one row.
                    return alienIndexValue >= 0 ? (alienIndexValue + numRowsCols.cols) : alienIndexValue;
                    /** If moving right and not at the right edge, keep moving right. */
                } else if (!rightEdge && !movingLeft.current) {
                    downShift.current = false;
                    // If not a hit alien (-1), move alien right.
                    return alienIndexValue >= 0 ? alienIndexValue + 1 : alienIndexValue;
                    /** If moving right and at the right edge, move down and change direction. */
                } else if (rightEdge && !movingLeft.current) {
                    if (alienIndexCounter.current === alienIndexes.length * 2) {
                        rightDownShifts.current += 2;
                        movingLeft.current = true;
                        alienIndexCounter.current = 0;
                    }
                    // Set downshift status.
                    downShift.current = true;
                    alienIndexCounter.current += 1;

                    // Downshift the alien location by one row.
                    return alienIndexValue >= 0 ? (alienIndexValue + numRowsCols.cols) : alienIndexValue;
                }
                downShift.current = false;

                return alienIndexValue;
            });

            return tempAlienIndexes;
        });
    }, [
        alienIndexes,
        numRowsCols.cols,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        alienLocation,
        clearAlienInterval,
    ]);

    const runGrid = useCallback(() => {
        setGridState((prevState) => {
            let tempGridState: JSX.Element[] = [...prevState];
            // Handle impacts.
            const impacts = laserBlasts.filter(laser => alienLocation.includes(laser));
            if (impacts.length > 0) {
                setAlienLocation(prevState => prevState.map((alien) => impacts.includes(alien) ? -1 : alien));
                setLaserBlasts(prevState => prevState.filter(laser => !impacts.includes(laser)));
            }

            tempGridState = tempGridState.map((square, index) => {
                if (impacts.includes(index)) {
                    // if (laserBlasts.includes(index) && alienLocation.includes(index)) {
                    return createImpactElement(index);
                } else if (laserBlasts.includes(index)) {
                    return createLaserBlast(index);
                } else if (alienLocation.includes(index)) {
                    return createAlienElement(index);
                } else {
                    return createTheInfiniteVoidOfSpaceElement(index);
                }
            });

            return tempGridState;
        });
    }, [
        alienLocation,
        laserBlasts,
        createImpactElement,
        createLaserBlast,
        createAlienElement,
        createTheInfiniteVoidOfSpaceElement,
    ]);

    const moveInvadersRef = useRef(moveInvaders);
    const runGridRef = useRef(runGrid);

    useEffect(() => {
        moveInvadersRef.current = moveInvaders;
        runGridRef.current = runGrid;
    }, [moveInvaders, runGrid]);

    const startAlienInterval = useCallback(() => {
        if (moveAliensIntervalRef.current) return;

        moveAliensIntervalRef.current = setInterval(() => {
            moveInvadersRef.current();
            // moveInvaders();
        }, 1000);
    }, []);

    const startGridInterval = useCallback(() => {
        if (runGridIntervalRef.current) return;

        runGridIntervalRef.current = setInterval(() => {
            runGridRef.current();
            // runGrid();
        }, 100);
    }, []);

    /** Player keyboard controls */
    useEffect(() => {
        const readyPlayerOne = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (playerOneIndex % numRowsCols.cols !== 0) {
                        playerEngagedRef.current = true;
                        setPlayerOneIndex((prev) => prev - 1);
                        playerOneIndexRef.current = playerOneIndexRef.current - 1;
                    }
                    break;
                case 'ArrowRight':
                    if (playerOneIndex % numRowsCols.cols < numRowsCols.cols - 1) {
                        playerEngagedRef.current = true;
                        setPlayerOneIndex((prev) => prev + 1);
                        playerOneIndexRef.current = playerOneIndexRef.current + 1;
                    }
                    break;
                case 'ArrowDown':
                    startAlienInterval();
                    startGridInterval();
                    break;
                case 'ArrowUp':
                    shootLaser();
                    break;
                case 'End':
                    clearAlienInterval();
                    clearGridInterval();
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
        startAlienInterval,
        clearAlienInterval,
        shootLaser,
        startGridInterval,
        clearGridInterval,
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
                            width: squareWidth,
                            height: squareHeight,
                        }}>
                            {square}
                        </div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default About;