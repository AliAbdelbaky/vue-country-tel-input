import {
    BorderType,
    ColorType,
    FontType,
    HeightType,
    PaddingType,
    TextType, ThemeType,
    TransitionsType
} from "@/_utils/theme.type"

const text: TextType = {
    tiny: '14px',
    sm: '14px', // 1rem = 16px
    md: '14px', // 1.25rem = 20px
    lg: '15px', // 2.1rem = 34px
}
const height: HeightType = {
    tiny: '22px',
    sm: '28px',
    md: '34px',
    lg: '40px',
}
const padding: PaddingType = {
    tiny: '0 8px',
    sm: '0 10px',
    md: '0 12px',
    lg: '0 14px',
}


const border: BorderType = {
    base: '1px solid #ededed',
    active: '1px solid #fdda00',
    hover: '1px solid #fdda00',
    focus: '1px solid #fdda00',
    error: '1px solid #d03050',
    radius: '0.5rem',
}
const color: ColorType = {
    primary: '#051638',
    primaryHover: '#fdda00',
    secondary: '#656E81',
    secondaryHover: '#474c52',
    menuHover: '#fdda00',
    menuActive: '#fdda00',
}
const font: FontType = {
    other: `'Baloo Bhaijaan 2', sans-serif`,
    en: `'Rubik', sans-serif`,
}
const transitions: TransitionsType = {
    base: 'all 0.3s ease-in-out',
    bezier: 'cubic-bezier(.4, 0, .2, 1)'
}

const theme: ThemeType = {
    text,
    border,
    color,
    font,
    transitions,
    height,
    padding
}

export default theme;