'use client';
import { motion } from 'framer-motion';
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';
// import { useContext } from 'react';
// import { SpaceInvadersContext } from '../../context/spaceInvadersContext';
import { useSpaceInvaders } from '../../context/SpaceInvadersContext';

const About = () => {
    const { gridSize, numRowsCols } = useSpaceInvaders();
    const { ref } = useSectionInView(0.6);
    const [deadAliens, setDeadAliens] = useState<number[]>([]);
    const [moveInvadersLeft, setMoveInvadersLeft] = useState<boolean>(true);
    // const alienIndexRef = useRef<number[]>([]);
    // const squaresRef = useRef<JSX.Element[] | undefined>([]);
    const playerEngagedRef = useRef<boolean>(false);

    const {
        gridSquares,
        motionSection,
        gridContainer,
        deadGridSquare,
    } = styles;

    const playerOneStartingPosition = numRowsCols.cols * (numRowsCols.rows - 2) + Math.floor(numRowsCols.cols / 2);
    const [playerOneIndex, setPlayerOneIndex] = useState<number>(playerOneStartingPosition);

    // Calculate exact square size to fill container with no gaps
    const squareWidth = gridSize ? gridSize.width / numRowsCols.cols : 50;
    const squareHeight = gridSize ? gridSize.height / numRowsCols.rows : 50;

    const numberOfSquaresInARowThatHasAnAlien = numRowsCols.cols * .6667;
    const numberOfSquaresInARowThatWontHaveAnAlien = Math.floor(numRowsCols.cols * .3333);
    // Get 1/3 of available cols in a row, rounded down to the nearest whole number
    const firstIndexOfFirstRowThatAliensAreIn = (Math.floor(numRowsCols.cols * .3333) % 2) === 0
        ? Math.floor(numRowsCols.cols * .3333) / 2
        : (Math.floor(numRowsCols.cols * .3333) + 1) / 2;

    const rowLength = (numRowsCols.cols - numberOfSquaresInARowThatWontHaveAnAlien);

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
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '30px',
                        }}>🚽</span>
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
    }, [
        numRowsCols.rows,
        numRowsCols.cols,
        alienIndexes,
        squareWidth,
        squareHeight,
        gridSquares
    ]);

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
    },  [playerOneStartingPosition, playerOneIndex]);

    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log('👾👾👾👾 numRowsCols.rows * numRowsCols.cols: ', numRowsCols.rows * numRowsCols.cols,);
    console.log('👾👾👾👾 squares: ', squares);
    console.log('👾👾👾👾 gridSize: ', gridSize);
    console.log('👾👾👾👾 squareWidth: ', squareWidth);
    console.log('👾👾👾👾 squareHeight: ', squareHeight);
    console.log('👾👾👾👾 numRowsCols: ', numRowsCols);
    console.log('👾👾👾👾 alienIndexes: ', alienIndexes);
    console.log('👾👾👾👾 alienLocation: ', alienLocation);
    console.log('👾👾👾👾 gridState: ', gridState);
    console.log('👾👾👾👾 playerOneStartingPosition: ', playerOneStartingPosition);
    console.log('👾👾👾👾 playerOneIndex: ', playerOneIndex);
    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log(' ');

    const moveInvaders = useCallback(() => {
        const leftEdge = firstIndexOfFirstRowThatAliensAreIn % numRowsCols.cols === 0;
        const rightEdge = (alienIndexes[alienIndexes?.length - 1] ?? rowLength - 1) % numRowsCols.cols === numRowsCols.cols - 1;
        const bottomEdge = playerOneIndex >= (numRowsCols.rows - 1) * numRowsCols.cols;

        console.log('🎃🎃🎃🎃 leftEdge: ', leftEdge);
        console.log('🎃🎃🎃🎃 moveInvadersLeft: ', moveInvadersLeft);
        console.log('🎃🎃🎃🎃 rightEdge: ', rightEdge);
        console.log('🎃🎃🎃🎃 bottomEdge: ', bottomEdge);
        // console.log(' ');

        if (!alienIndexes || alienIndexes.length === 0) {
            return;
        }

        setAlienLocation(prevAlienLocation => {
            let newAlienIndexes = [...prevAlienLocation];

            newAlienIndexes = newAlienIndexes.map((alienIndex, index) => {
                if (!leftEdge && moveInvadersLeft) {
                    return alienIndex - 1;
                } else if (leftEdge && moveInvadersLeft) {
                    setMoveInvadersLeft(prev => !prev);
                    return alienIndex + 1;
                } else if (!rightEdge && !moveInvadersLeft) {
                    return alienIndex + 1;
                } else if (rightEdge && !moveInvadersLeft) {
                    setMoveInvadersLeft(prev => !prev);
                    return alienIndex - 1;
                }
                return alienIndex;
            });

            return newAlienIndexes;
        });

        console.log('🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻');
        console.log('🩻🩻🩻🩻 alienIndexes: ', alienIndexes);
        console.log('🩻🩻🩻🩻 alienLocation: ', alienLocation);

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
                            }}>🚽</span>
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


        console.log('🩻🩻🩻🩻 gridState: ', gridState);
        console.log('🩻🩻🩻🩻 playerOneStartingPosition: ', playerOneStartingPosition);
        console.log('🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻🩻');
        console.log(' ');
    }, [
        alienIndexes,
        numRowsCols.cols,
        numRowsCols.rows,
        firstIndexOfFirstRowThatAliensAreIn,
        playerOneIndex,
        moveInvadersLeft,
        rowLength,
        setMoveInvadersLeft,
        playerOneStartingPosition,
        gridSquares,
        squareWidth,
        squareHeight,
        gridState,
        deadAliens,
        deadGridSquare,
        alienLocation,
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            moveInvaders();
        }, 1000);

        return () => clearInterval(interval);
    }, [alienIndexes, moveInvaders]);

    // setInterval(moveInvaders, 5000);

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
    }, [numRowsCols.cols, playerOneIndex, squares.length, numberOfSquaresInARowThatWontHaveAnAlien, moveInvaders]);

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