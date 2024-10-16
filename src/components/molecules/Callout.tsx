import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface CalloutProps {
    icon: string;
    children: ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ icon, children }) => (
    <div className={styles.notionCallout}>
        <div className={styles.notionCalloutIcon}>{icon}</div>
        <div className={styles.notionCalloutText}>{children}</div>
    </div>
);

export default Callout;
