export interface ThemeType {
    text: TextType;
    height: HeightType;
    padding: PaddingType;
    border: BorderType;
    color: ColorType;
    font: FontType;
    transitions: TransitionsType;
}

export interface TextType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

export interface HeightType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

export interface PaddingType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

export interface BorderType {
    base: string;
    active: string;
    hover: string;
    focus: string;
    error: string;
    radius: string;
}

export interface ColorType {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    menuHover: string;
    menuActive: string;
}

export interface FontType {
    other: string;
    en: string;
}

export interface TransitionsType {
    base: string;
    bezier: string;
}

