import {ThemeType} from "./types/theme.type.ts";

export interface IProps {
    msg?: string,
    size?: 'tiny' | 'small' | 'medium' | 'large',
    label?: string
    themeOverride?: ThemeType
    showRequired?: boolean
    showLabel?: boolean,
    selectWidth?: string
}
