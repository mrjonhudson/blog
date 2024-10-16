import React from 'react';
import { BlockType, BlockValue, PageData } from '../types/notion';
import styles from '../styles/CustomNotionRenderer.module.css';

// Import all atom, molecule, and organism components
import Text from './atoms/Text';
import Heading from './atoms/Heading';
import Image from './atoms/Image';
import Divider from './atoms/Divider';
import Checkbox from './atoms/Checkbox';
import ListItem from './molecules/ListItem';
import Toggle from './molecules/Toggle';
import Quote from './molecules/Quote';
import Callout from './molecules/Callout';
import Code from './molecules/Code';
import Equation from './molecules/Equation';
import Page from './organisms/Page';
import List from './organisms/List';

interface NotionRendererProps {
    blockMap: PageData;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blockMap }) => {
    const renderBlock = (block: BlockValue): React.ReactNode => {
        switch (block.type) {
            case BlockType.Page:
                return (
                    <Page
                        title={block.properties?.title?.[0]?.[0] || 'Untitled'}
                        icon={block.format?.page_icon}
                        cover={block.format?.page_cover}
                    >
                        {block.content?.map((blockId) => renderBlock(blockMap[blockId].value))}
                    </Page>
                );
            case BlockType.Text:
                return <Text>{block.properties?.title?.[0]?.[0] || ''}</Text>;
            case BlockType.Header:
                return <Heading level={1}>{block.properties?.title?.[0]?.[0] || ''}</Heading>;
            case BlockType.SubHeader:
                return <Heading level={2}>{block.properties?.title?.[0]?.[0] || ''}</Heading>;
            case BlockType.SubSubHeader:
                return <Heading level={3}>{block.properties?.title?.[0]?.[0] || ''}</Heading>;
            case BlockType.BulletedList:
            case BlockType.NumberedList:
                return (
                    <List type={block.type === BlockType.BulletedList ? 'bulleted' : 'numbered'}>
                        <ListItem type={block.type === BlockType.BulletedList ? 'bulleted' : 'numbered'}>
                            {block.properties?.title?.[0]?.[0] || ''}
                        </ListItem>
                    </List>
                );
            case BlockType.Toggle:
                return (
                    <Toggle title={block.properties?.title?.[0]?.[0] || ''}>
                        {block.content?.map((blockId) => renderBlock(blockMap[blockId].value))}
                    </Toggle>
                );
            case BlockType.Quote:
                return <Quote>{block.properties?.title?.[0]?.[0] || ''}</Quote>;
            case BlockType.Callout:
                return (
                    <Callout icon={block.format?.page_icon || ''}>
                        {block.properties?.title?.[0]?.[0] || ''}
                    </Callout>
                );
            case BlockType.Divider:
                return <Divider />;
            case BlockType.Image:
                return (
                    <Image
                        src={block.properties?.source?.[0]?.[0] || block.format?.display_source || ''}
                        alt={block.properties?.caption?.[0]?.[0] || ''}
                        caption={block.properties?.caption?.[0]?.[0]}
                    />
                );
            case BlockType.Code:
                return (
                    <Code
                        code={block.properties?.title?.[0]?.[0] || ''}
                        language={block.properties?.language?.[0]?.[0]}
                    />
                );
            case BlockType.Equation:
                return <Equation equation={block.properties?.title?.[0]?.[0] || ''} />;
            case BlockType.TodoList:
                return (
                    <div className={styles.notionTodo}>
                        <Checkbox checked={block.properties?.checked?.[0]?.[0] === 'Yes'} />
                        <Text>{block.properties?.title?.[0]?.[0] || ''}</Text>
                    </div>
                );
            default:
                console.log('Unsupported block type:', block.type);
                return null;
        }
    };

    return (
        <div className={styles.notionContent}>
            {Object.values(blockMap).map((block) => (
                <React.Fragment key={block.value.id}>{renderBlock(block.value)}</React.Fragment>
            ))}
        </div>
    );
};

export default NotionRenderer;
