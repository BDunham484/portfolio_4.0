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
    const downShift = useRef<boolean>(false);
    const leftDownShifts = useRef<number>(1);
    const numOfRowsOfAliens = 5;
    const rightDownShifts = useRef<number>(numOfRowsOfAliens + 2);

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
    const [laserShots, setLaserShots] = useState<number[]>([]);
    const deadAliensRef = useRef<number[]>(deadAliens);
    const hitAlienRef = useRef<number>(-1);
    const laserShotsRef = useRef<number>(-1);

    const shootLaser = useCallback(() => {
        setLaserShots((prevLaserShots) => [...prevLaserShots, playerOneIndexRef.current - numRowsCols.cols]);
    }, [numRowsCols.cols]);

    const laserMotion = useCallback(() => {
        if (!laserShots || laserShots.length === 0) return;

        setLaserShots((prevLaserShots) => {
            const removeIndex = prevLaserShots.indexOf(laserShotsRef.current);
            console.log('🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️');
            console.log('🕹️🕹️🕹️🕹️ prevLaserShots: ', prevLaserShots);
            console.log('🕹️🕹️🕹️🕹️ laserShotsRef.current: ', laserShotsRef.current);
            console.log('🕹️🕹️🕹️🕹️ removeIndex: ', removeIndex);
            let newLaserShots = laserShotsRef.current < 0 ? [...prevLaserShots] : [...prevLaserShots.filter((shot) => shot !== laserShotsRef.current)];
            // let newLaserShots = laserShotsRef.current < 0 ? [...prevLaserShots] : [...prevLaserShots.slice(removeIndex, removeIndex + 1)];
            // let newLaserShots = laserShotsRef.current < 0 ? [...prevLaserShots] : [...prevLaserShots.slice(laserShotsRef.current, laserShotsRef.current + 1)];
            console.log('🕹️🕹️🕹️🕹️ newLaserShots: ', newLaserShots);
            console.log('🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️');
            console.log(' ');

            /** Move all current laser shots forward */
            // newLaserShots = newLaserShots.map((laserShot) => laserShot - numRowsCols.cols);
            newLaserShots = newLaserShots.map((laserShot) => laserShot - numRowsCols.cols).filter((laserShot) => laserShot >= 0);
            console.log('🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩');
            console.log('🧩🧩🧩🧩 newLaserShots: ', newLaserShots);
            console.log('🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩');
            console.log(' ');

            return newLaserShots;
        });
    }, [laserShots, numRowsCols.cols]);

    useEffect(() => {
        if (!laserShots || laserShots.length === 0) return;

        const interval = setInterval(() => {
            laserMotion();
        }, 100);

        return () => clearInterval(interval);
    }, [
        laserShots,
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

    const moveInvaders = useCallback(() => {
        const leftEdge = (alienLocation[0] ?? firstIndexOfFirstRowThatAliensAreIn) % numRowsCols.cols === 0;
        const rightEdge = (alienLocation[alienLocation?.length - 1] ?? rowLength - 1) % numRowsCols.cols === numRowsCols.cols - 1;

        if (!alienIndexes || alienIndexes.length === 0) {
            return;
        }

        setAlienLocation(prevAlienLocation => {
            let newAlienIndexes = [...prevAlienLocation];

            newAlienIndexes = newAlienIndexes.map((alienIndexValue, index, thisAliensArray) => {
                if (alienIndexValue === playerOneIndexRef.current) {
                    // Game over
                    clearAlienInterval();
                    /** If moving left and not at the left edge of the viewport, keep moving left. */
                } else if (!leftEdge && movingLeft.current) {
                    downShift.current = false;
                    return alienIndexValue - 1;
                    /** If at the left edge and currently moving left, move down and change direction. */
                } else if (leftEdge && movingLeft.current) {
                    if (index === 0 && alienIndexValue === numRowsCols.cols * leftDownShifts.current) {
                        leftDownShifts.current += 2;
                        movingLeft.current = false;
                    }
                    downShift.current = true;

                    return (alienIndexValue + numRowsCols.cols);
                    /** If moving right and not at the right edge, keep moving right. */
                } else if (!rightEdge && !movingLeft.current) {
                    downShift.current = false;
                    return alienIndexValue + 1;
                    /** If moving right and at the right edge, move down and change direction. */
                } else if (rightEdge && !movingLeft.current) {
                    if (index === alienIndexes.length - 1 && alienIndexValue === ((numRowsCols.cols * rightDownShifts.current) - 1)) {
                        rightDownShifts.current += 2;
                        movingLeft.current = true;
                    }
                    downShift.current = true;

                    return (alienIndexValue + numRowsCols.cols);
                }
                downShift.current = false;

                return alienIndexValue;
            });

            return newAlienIndexes;
        });

        /** Update deadAlien indexes as well. */
        setDeadAliens((prevDeadAliens) => {
            console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
            console.log('💀💀💀💀 prevDeadAliens: ', prevDeadAliens);
            console.log('💀💀💀💀 deadAliensRef.current: ', deadAliensRef.current);
            console.log('💀💀💀💀 deadAliensRef.current.filter((deadAlien) => !prevDeadAliens.includes(deadAlien)): ', deadAliensRef.current.filter((deadAlien) => !prevDeadAliens.includes(deadAlien)));
            let newDeadAliens = hitAlienRef.current < 0 ? [...prevDeadAliens] : [...prevDeadAliens, hitAlienRef.current];
            // let newDeadAliens = [...prevDeadAliens, ...deadAliensRef.current.filter((deadAlien) => !prevDeadAliens.includes(deadAlien))];
            console.log('💀💀💀💀 newDeadAliens: ', newDeadAliens);
            console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
            console.log(' ');

            newDeadAliens = newDeadAliens.map((deadAlienIndex) => {
                if (downShift.current) {
                    return deadAlienIndex + numRowsCols.cols;
                } else if (movingLeft.current) {
                    return deadAlienIndex - 1;
                } else {
                    return deadAlienIndex + 1;
                }
            });

            hitAlienRef.current = -1;

            return newDeadAliens;
        });

        // setGridState((prevState) => {
        //     let newState: JSX.Element[] = [...prevState];

        //     newState = newState.map((square, index) => {
        //         if (laserShots.includes(index) && alienLocation.includes(index) && !deadAliens.includes(index)) {
        //             // Hit alien
        //             const laserIndex = laserShots?.indexOf(index);
        //             if (laserIndex > -1) {
        //                 laserShotsRef.current = index;
        //             }
        //             // laserShotsRef.current = laserShotsRef.current.filter((shot) => shot !== index);
        //             // deadAliensRef.current = [...deadAliensRef.current, index];
        //             hitAlienRef.current = index;
        //             return (
        //                 <div
        //                     key={'hitAlien' + index}
        //                     className={deadGridSquare}
        //                     style={{
        //                         width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex',
        //                         alignItems: 'flex-start',
        //                         justifyContent: 'center',
        //                         fontSize: '60px',
        //                     }}
        //                 >
        //                     💥
        //                 </div>
        //             );
        //         } else if (alienLocation.includes(index)) {
        //             return (
        //                 <div
        //                     key={'alien' + index}
        //                     className={gridSquares}
        //                     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
        //                     onClick={() => setDeadAliens((prev) => [...prev, index])}
        //                 >
        //                     <span style={{
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                         fontSize: '30px',
        //                         // }}>{index}</span>
        //                     }}>👾</span>
        //                 </div>
        //             );
        //         } else if (deadAliens.includes(index)) {
        //             return (
        //                 <div
        //                     key={'deadAlien' + index}
        //                     className={deadGridSquare}
        //                     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
        //                 />
        //             );
        //         } else if (laserShots.includes(index)) {
        //             return (
        //                 <div key={'laser' + index} style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', background: 'transparent' }}>
        //                     <span style={{
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                         fontSize: '30px',
        //                         color: '#39FF14',
        //                     }}>{'|'}</span>
        //                 </div>
        //             );
        //         } else {
        //             return (
        //                 // <div
        //                 //     key={'empty' + index}
        //                 //     className={gridSquares}
        //                 //     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
        //                 // >{index}</div>
        //                 <div
        //                     key={'empty' + index}
        //                     className={gridSquares}
        //                     style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box' }}
        //                 />
        //             );
        //         }
        //     });

        //     return newState;
        // });
    }, [
        alienIndexes,
        numRowsCols.cols,
        firstIndexOfFirstRowThatAliensAreIn,
        rowLength,
        // gridSquares,
        // squareWidth,
        // squareHeight,
        // deadAliens,
        setDeadAliens,
        // deadGridSquare,
        alienLocation,
        clearAlienInterval,
        // laserShots,
    ]);

    const runGrid = useCallback(() => {
        setGridState((prevState) => {
            let newState: JSX.Element[] = [...prevState];

            newState = newState.map((square, index) => {
                if (laserShots.includes(index) && alienLocation.includes(index) && !deadAliens.includes(index)) {
                    // Hit alien
                    const laserIndex = laserShots?.indexOf(index);
                    if (laserIndex > -1) {
                        laserShotsRef.current = index;
                    }
                    // laserShotsRef.current = laserShotsRef.current.filter((shot) => shot !== index);
                    // deadAliensRef.current = [...deadAliensRef.current, index];
                    hitAlienRef.current = index;
                    return (
                        <div
                            key={'hitAlien' + index}
                            className={deadGridSquare}
                            style={{
                                width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                fontSize: '60px',
                            }}
                        >
                            💥
                        </div>
                    );
                } else if (alienLocation.includes(index)) {
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
                } else if (laserShots.includes(index)) {
                    return (
                        <div key={'laser' + index} style={{ width: squareWidth, height: squareHeight, margin: 0, padding: 0, boxSizing: 'border-box', background: 'transparent' }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '30px',
                                color: '#39FF14',
                            }}>{'|'}</span>
                        </div>
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
        alienLocation,
        laserShots,
        deadAliens,
        setDeadAliens,
        gridSquares,
        squareWidth,
        squareHeight,
        deadGridSquare,
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         moveInvaders();
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [
    //     alienIndexes,
    //     moveInvaders,
    // ]);

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