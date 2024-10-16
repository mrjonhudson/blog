import React from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface CodeProps {
    code: string;
    language?: string;
}

const Code: React.FC<CodeProps> = ({ code, language }) => (
    <pre className={styles.notionCode}>
        <code className={language ? `language-${language}` : ''}>{code}</code>
    </pre>
);

export default Code;
