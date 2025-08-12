'use client';
import { useSpaceInvaders } from '../../../context/SpaceInvadersContext';
import styles from './GhostGrid.module.css';

const GhostGrid = () => {
    const { gridRef } = useSpaceInvaders();
    const { gridContainer } = styles;
    
    return (<div ref={gridRef} className={gridContainer} />);
};

export default GhostGrid;