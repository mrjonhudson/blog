import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface QuoteProps {
    children: ReactNode;
}

const Quote: React.FC<QuoteProps> = ({ children }) => (
    <blockquote className={styles.notionQuote}>{children}</blockquote>
);

export default Quote;
