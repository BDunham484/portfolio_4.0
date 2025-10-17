'use client';
import { motion } from 'framer-motion';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useSpaceInvaders } from '../../context/SpaceInvadersContext';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';
import { useGameElements } from './hooks/useGameElements';
import MovieXWingFighter from './XWing';

const About = () => {
    const {
        // gridSize,
        numRowsCols,
        alienIndexes,
        // firstIndexOfFirstRowThatAliensAreIn,
        // rowLength,
        playerOneStartingPosition,
        squares,
        // deadAliens,
        // setDeadAliens,
        squareWidth,
        squareHeight,
    } = useSpaceInvaders();

    const { ref } = useSectionInView(0.6);

    // changelog-start
    useEffect(() => {
        console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
        console.log('💀💀💀💀 squares: ', squares);
        console.log('💀💀💀💀 alienIndexes: ', alienIndexes);
        console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
        console.log(' ');
    }, [squares, alienIndexes]);
    // changelog-end

    // Player refs.
    const playerOneIndexRef = useRef<number>(playerOneStartingPosition);
    const playerEngagedRef = useRef<boolean>(false);
    // Grid movement refs.
    const runGridIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const movingLeft = useRef<boolean>(true);
    const downShift = useRef<boolean>(false);
    const leftDownShifts = useRef<number>(1);
    const numOfRowsOfAliens = 5;
    const rightDownShifts = useRef<number>(numOfRowsOfAliens + 2);
    // Alien movement refs.
    const alienIndexCounter = useRef<number>(0);
    const moveAliensIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const alienLocationRef = useRef<number[]>(alienIndexes);
    // Combat refs.
    const hitAlienRef = useRef<number>(-1);
    const laserShotsRef = useRef<number>(-1);
    const alienFireIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const [gridState, setGridState] = useState<JSX.Element[]>(squares);
    const [playerOneIndex, setPlayerOneIndex] = useState<number>(playerOneStartingPosition);
    const [alienLocation, setAlienLocation] = useState<number[]>(alienIndexes);
    const [laserBlasts, setLaserBlasts] = useState<number[]>([]);
    const [alienLasers, setAlienLasers] = useState<number[]>([]);
    const [isPlayerDead, setIsPlayerDead] = useState(false);

    const {
        // gridSquares,
        motionSection,
        gridContainer,
        // deadGridSquare,
    } = styles;

    const {
        createImpactElement,
        createInvaderLaserBlast,
        createLaserBlast,
        createAlienElement,
        createTheInfiniteVoidOfSpaceElement,
        blowEmUp,
    } = useGameElements({
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
            let newLaserShots = [...prevLaserShots];
            /** Move all current laser shots forward */
            newLaserShots = newLaserShots.map((laserShot) => laserShot - numRowsCols.cols).filter((laserShot) => laserShot >= 0);

            return newLaserShots;
        });
    }, [laserBlasts, numRowsCols.cols]);

    // Ensures only aliens that have no other aliens below them in the same column can fire.
    const getAliensThatCanFire = useCallback((alienLocation: number[], numRowsCols: { rows: number, cols: number }) => {
        const aliveAliens = alienLocation.filter(alien => alien >= 0);
        const canFire: number[] = [];

        aliveAliens.forEach(alienIndex => {
            const alienRow = Math.floor(alienIndex / numRowsCols.cols);
            const alienCol = alienIndex % numRowsCols.cols;

            // Check if there's any alien below this one in the same column
            const hasAlienBelow = aliveAliens.some(otherAlien => {
                const otherRow = Math.floor(otherAlien / numRowsCols.cols);
                const otherCol = otherAlien % numRowsCols.cols;
                return otherCol === alienCol && otherRow > alienRow;
            });

            if (!hasAlienBelow) {
                canFire.push(alienIndex);
            }
        });

        return canFire;
    }, []);

    const fireAlienLaser = useCallback(() => {
        const aliensThatCanFire = getAliensThatCanFire(alienLocationRef.current, numRowsCols);

        if (aliensThatCanFire.length > 0) {
            const randomAlienIndex = aliensThatCanFire[Math.floor(Math.random() * aliensThatCanFire.length)];

            if (randomAlienIndex) {
                const laserStartPosition = randomAlienIndex + numRowsCols.cols;

                // Only fire if the laser won't immediately hit another alien
                if (!alienLocationRef.current.includes(laserStartPosition)) {
                    setAlienLasers(prev => [...prev, laserStartPosition]);
                }
            }
        }
    }, [numRowsCols, getAliensThatCanFire]);

    const startAlienFiring = useCallback(() => {
        if (alienFireIntervalRef.current) return;

        alienFireIntervalRef.current = setInterval(() => {
            fireAlienLaser();
        }, 2000 + Math.random() * 1000);
    }, [fireAlienLaser]);

    const stopAlienFiring = useCallback(() => {
        if (alienFireIntervalRef.current) {
            clearInterval(alienFireIntervalRef.current);
            alienFireIntervalRef.current = null;
        }
    }, []);

    const moveAlienLasers = useCallback(() => {
        if (alienLasers.length === 0) return;

        setAlienLasers((prevAlienLasers) => {
            const tempAlienLasers = [...prevAlienLasers];

            return tempAlienLasers
                .map(laser => laser + numRowsCols.cols)
                .filter(laser => laser < numRowsCols.rows * numRowsCols.cols); // Remove lasers that go off screen
        });
    }, [alienLasers, numRowsCols]);

    // Refs to keep functions stable in intervals
    const moveAlienLasersRef = useRef(moveAlienLasers);
    const laserMotionRef = useRef(laserMotion);

    useEffect(() => {
        moveAlienLasersRef.current = moveAlienLasers;
        laserMotionRef.current = laserMotion;
    }, [moveAlienLasers, laserMotion]);

    useEffect(() => {
        if (alienLasers.length === 0) return;

        const interval = setInterval(() => {
            moveAlienLasersRef.current();
        }, 150); // Slightly slower than player lasers

        return () => clearInterval(interval);
    }, [alienLasers, moveAlienLasers]);

    useEffect(() => {
        if (!laserBlasts || laserBlasts.length === 0) return;

        const interval = setInterval(() => {
            laserMotionRef.current();
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

    // Keep ref synchronized with state
    useEffect(() => {
        alienLocationRef.current = alienLocation;
    }, [alienLocation]);

    useEffect(() => {
        // changelog-start
        if (!playerEngagedRef.current && playerOneStartingPosition !== playerOneIndexRef.current) {
        // if (!playerEngagedRef.current && playerOneStartingPosition !== playerOneIndex) {
            // setPlayerOneIndex(playerOneStartingPosition);
            // changelog-end
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

    const getRightmostAliveAlien = useCallback((alienLocation: number[], numRowsCols: { rows: number, cols: number }) => {
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
    }, []);

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
        getLeftmostAliveAlien,
        getRightmostAliveAlien,
        alienIndexes,
        numRowsCols,
        alienLocation,
        clearAlienInterval,
    ]);

    const runGrid = useCallback(() => {
        setGridState((prevState) => {
            let tempGridState: JSX.Element[] = [...prevState];
            // Handle impacts.
            const impacts = laserBlasts.filter(laser => alienLocationRef.current.includes(laser));

            if (impacts.length > 0) {
                setAlienLocation(prevState => prevState.map((alien) => impacts.includes(alien) ? -1 : alien));
                setLaserBlasts(prevState => prevState.filter(laser => !impacts.includes(laser)));
            }

            const alienHitsPlayer = alienLasers.includes(playerOneIndexRef.current);
            if (alienHitsPlayer) {
                // Handle player being hit
                setAlienLasers(prev => prev.filter(laser => laser !== playerOneIndexRef.current));
                // Add game over logic here
            }

            tempGridState = tempGridState.map((square, index) => {
                if (alienHitsPlayer && index === playerOneIndexRef.current) {
                    setIsPlayerDead(true);

                    return createImpactElement(index);
                } else if (impacts.includes(index)) {
                    return createImpactElement(index);
                } else if (alienLasers.includes(index)) {
                    return createInvaderLaserBlast(index);
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
        alienLasers,
        createInvaderLaserBlast,
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
        }, 1000);
    }, []);

    const startGridInterval = useCallback(() => {
        if (runGridIntervalRef.current) return;

        runGridIntervalRef.current = setInterval(() => {
            runGridRef.current();
        }, 100);
    }, []);



    /** Player keyboard controls */
    useEffect(() => {
        const readyPlayerOne = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    // changelog-start
                    if (!isPlayerDead && playerOneIndexRef.current % numRowsCols.cols !== 0) {
                    // if (!isPlayerDead && playerOneIndex % numRowsCols.cols !== 0) {
                        // changelog-end
                        playerEngagedRef.current = true;
                        // setPlayerOneIndex((prev) => prev - 1);
                        playerOneIndexRef.current = playerOneIndexRef.current - 1;
                    }
                    break;
                case 'ArrowRight':
                    // changelog-start
                    if (!isPlayerDead && playerOneIndexRef.current % numRowsCols.cols < numRowsCols.cols - 1) {
                    // if (!isPlayerDead && playerOneIndex % numRowsCols.cols < numRowsCols.cols - 1) {
                        // changelog-end
                        playerEngagedRef.current = true;
                        // setPlayerOneIndex((prev) => prev + 1);
                        playerOneIndexRef.current = playerOneIndexRef.current + 1;
                    }
                    break;
                case 'ArrowDown':
                    if (!isPlayerDead) {
                        startAlienInterval();
                        startGridInterval();
                        startAlienFiring();
                    }
                    break;
                case 'ArrowUp':
                    shootLaser();
                    break;
                case 'End':
                    clearAlienInterval();
                    clearGridInterval();
                    stopAlienFiring();
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
        playerOneIndex,
        // TODO: Are the next necessary?
        numRowsCols.cols,
        squares.length,
        moveInvaders,
        startAlienInterval,
        startGridInterval,
        startAlienFiring,
        shootLaser,
        clearAlienInterval,
        clearGridInterval,
        stopAlienFiring,
        isPlayerDead,
    ]);

    // Run end-game side effects on player death.
    useEffect(() => {
        if (isPlayerDead) {
            clearAlienInterval();
            clearGridInterval();
            stopAlienFiring();
        }
    }, [
        isPlayerDead,
        clearAlienInterval,
        clearGridInterval,
        stopAlienFiring,
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
                    // changelog-start
                    if (index === playerOneIndexRef.current) {
                    // if (index === playerOneIndex) {
                        // changelog-end
                        return (
                            <div
                                key={'square-' + square.key}
                                style={{
                                    width: squareWidth,
                                    height: squareHeight,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {isPlayerDead ? blowEmUp(index) : (
                                    <div style={{ transform: 'scale(1.2)' }}>
                                        <MovieXWingFighter />
                                    </div>
                                )}
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
