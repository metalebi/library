export type MagicTooltipPosition = 'above' | 'below' | 'left' | 'right' | 'dynamic';
export type MagicColorType = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'white' | 'black' | 'secondary';
export type MagicButtonType = 'fab' | 'icon';
export type MagicSizeType = 'xs' | 'sm' | 'md' | 'lg';
export type MagicStylePropertyType = 'align-content' | 'align-items' | 'height' | 'max-height' | 'background';
export type MagicStyleType = {
    [key in MagicStylePropertyType]?: string | number;
}