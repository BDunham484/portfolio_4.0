'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSectionInView } from '../../hooks/useSectionInView';
import styles from './About.module.css';

const About = () => {
    const { ref } = useSectionInView(0.6);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [gridSize, setGridSize] = useState<{ width: number; height: number } | null>(null);
    const [numRowsCols, setNumRowsCols] = useState<{ rows: number; cols: number }>({ rows: 6, cols: 12 });
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

    // Calculate exact square size to fill container with no gaps
    const squareWidth = gridSize ? gridSize.width / numRowsCols.cols : 50;
    const squareHeight = gridSize ? gridSize.height / numRowsCols.rows : 50;

    const squares = Array.from({ length: numRowsCols.rows * numRowsCols.cols }, (_, index) => (
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
    ));

    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log('👾👾👾👾 squares: ', squares);
    console.log('👾👾👾👾 gridSize: ', gridSize);
    console.log('👾👾👾👾 squareWidth: ', squareWidth);
    console.log('👾👾👾👾 squareHeight: ', squareHeight);
    console.log('👾👾👾👾👾👾👾👾👾👾👾👾👾👾');
    console.log(' ');


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
                {squares.map((square, index) => (
                    <div key={'square-' + square.key} style={{
                        display: 'flex',
                    }}>
                        {/* <div key={'square-' + square.key} style={{ display: 'inline-block' }}> */}
                        {deadAliens.includes(index) ? (
                            <div style={{ width: squareWidth, height: squareHeight, background: 'transparent' }} />
                        ) : square}
                    </div>

                ))}
            </div>
        </motion.section>
    );
};

export default About;