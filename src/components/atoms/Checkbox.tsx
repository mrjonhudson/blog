import React from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface CheckboxProps {
    checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked }) => (
    <input type="checkbox" checked={checked} readOnly className={styles.notionTodoCheckbox} />
);

export default Checkbox;
