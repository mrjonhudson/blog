import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface HeadingProps {
    level: 1 | 2 | 3 | 4;
    children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, children }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag className={styles[`notionH${level}`]}>{children}</Tag>;
};

export default Heading;
