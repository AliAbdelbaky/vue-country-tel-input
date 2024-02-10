import {ThemeType} from '../assets/types/theme.type.ts';

export type Sizes = 'tiny' | 'small' | 'medium' | 'large'
export default function themeConfig(theme: ThemeType, size: Sizes, prefix?: string) {
    const indexKeyBasedSize = {
        'tiny': 0,
        'small': 1,
        'medium': 2,
        'large': 3
    }

    const getSizeVarsClassNames = (key: string, obj: ThemeType, size: Sizes, prefix: string) => {
        let cssClasses = '';
        const index = indexKeyBasedSize[size];
        // @ts-ignore
        const value = Object.values(obj[key])[index];
        cssClasses += `${prefix}${key}: ${value};`;
        return cssClasses;
    }

    function GTC(obj: ThemeType, size: Sizes, prefix = '--a-') { // Generate Theme Classes
        let cssClasses = '';
        for (const key in obj) {
            const isSizeKey = ['text', 'height', 'padding'].includes(key);
            if (isSizeKey) {
                cssClasses += getSizeVarsClassNames(key, obj, size, prefix);
                continue;
            }

            if (obj.hasOwnProperty(key)) {
                // @ts-ignore
                let value = obj[key];


                if (typeof value === 'object') {
                    // Recursively generate CSS classes for nested objects
                    cssClasses += GTC(value, size, `${prefix}${key}-`);

                } else {
                    // Generate CSS class for the current key-value pair
                    const varName = `${`${prefix}${key}`.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
                    const cssRule = `${varName}: ${value};`;
                    cssClasses += cssRule + '\n';
                }
            }
        }
        return cssClasses;
    }

    return GTC(theme, size, prefix)
}