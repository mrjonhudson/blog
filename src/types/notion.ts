export enum BlockType {
    Page = 'page',
    Text = 'text',
    Header = 'header',
    SubHeader = 'sub_header',
    SubSubHeader = 'sub_sub_header',
    BulletedList = 'bulleted_list',
    NumberedList = 'numbered_list',
    Toggle = 'toggle',
    Quote = 'quote',
    Callout = 'callout',
    Divider = 'divider',
    Image = 'image',
    Code = 'code',
    Equation = 'equation',
    TodoList = 'to_do',
}

export interface BlockValue {
    id: string;
    type: BlockType;
    properties?: {
        title?: string[][];
        source?: string[][];
        caption?: string[][];
        checked?: string[][];
        [key: string]: any;
    };
    format?: {
        block_width?: number;
        block_height?: number;
        display_source?: string;
        page_icon?: string;
        [key: string]: any;
    };
    content?: string[];
    [key: string]: any;
}

export interface Block {
    value: BlockValue;
}

export interface PageData {
    [key: string]: Block;
}
