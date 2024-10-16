import React, { ReactNode } from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface ListItemProps {
    children: ReactNode;
    type: 'bulleted' | 'numbered';
}

const ListItem: React.FC<ListItemProps> = ({ children, type }) => (
    <li className={styles[`notion${type === 'bulleted' ? 'Bulleted' : 'Numbered'}List`]}>{children}</li>
);

export default ListItem;
