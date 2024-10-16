import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';
import Heading from '../atoms/Heading';

interface PageProps {
    title: string;
    icon?: string;
    cover?: string;
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ title, icon, cover, children }) => (
    <div className={styles.notionPage}>
        {cover && <img src={cover} alt={title} className={styles.notionPageCover} />}
        <div className={styles.notionPageContent}>
            {icon && <div className={styles.notionPageIcon}>{icon}</div>}
            <Heading level={1}>{title}</Heading>
            {children}
        </div>
    </div>
);

export default Page;
