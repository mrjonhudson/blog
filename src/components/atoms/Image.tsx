import React from 'react';
import styles from '../../styles/CustomNotionRenderer.module.css';

interface ImageProps {
    src: string;
    alt: string;
    caption?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, caption }) => (
    <figure className={styles.notionImage}>
        <img src={src} alt={alt} className={styles.notionImageContent} />
        {caption && <figcaption className={styles.notionImageCaption}>{caption}</figcaption>}
    </figure>
);

export default Image;
