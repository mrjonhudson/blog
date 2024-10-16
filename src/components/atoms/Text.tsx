import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface TextProps {
    children: ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => (
    <p className={`${styles.notionText} ${className || ''}`}>{children}</p>
);

export default Text;
