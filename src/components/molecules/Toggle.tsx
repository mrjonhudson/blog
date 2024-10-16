import React, { useState, ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface ToggleProps {
    title: ReactNode;
    children: ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.notionToggle}>
            {/* <div className={styles.notionToggleHeader} onClick={() => setIsOpen(!isOpen)}>
                <span className={`${styles.notionToggleTriangle} ${isOpen ? styles.notionToggleOpen : ''}`}>▶</span>
                {title}
            </div>
            {isOpen && <div className={styles.notionToggleContent}>{children}</div>} */}
            <p>TOGGLE</p>
        </div>
    );
};

export default Toggle;
