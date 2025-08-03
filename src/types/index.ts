export interface Token {
    name: string;
    value: string;
}

export type DesignType = 'material' | 'minimalist' | 'neumorphic' | 'skeuomorphic' | 'ant-design';

export interface ColorScheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}