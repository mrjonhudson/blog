import React from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface EquationProps {
    equation: string;
}

const Equation: React.FC<EquationProps> = ({ equation }) => (
    <div className={styles.notionEquation}>{equation}</div>
);

export default Equation;
