import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface ListProps {
    children: ReactNode;
    type: 'bulleted' | 'numbered';
}

const List: React.FC<ListProps> = ({ children, type }) => {
    const Tag = type === 'bulleted' ? 'ul' : 'ol';
    return <Tag className={styles[`notion${type === 'bulleted' ? 'Bulleted' : 'Numbered'}List`]}>{children}</Tag>;
};

export default List;
