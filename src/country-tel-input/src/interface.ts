import {ExtractBasePropsType} from "@/_utils/extractProps";
import {PropType} from "vue";
import {Sizes, ThemeType} from "@/_utils/theme.type";

export const countryTelInputProps = {
    size: {
        type: String as PropType<Sizes>,
        default: 'medium'
    },
    label: {
        type: String,
        default: 'Phone number'
    },
    showRequired: {
        type: Boolean,
        default: true
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    themeOverride: {
        type: Object as PropType<Partial<ThemeType>>,
        default: null
    },
    countryValue: {
        type: String || null || undefined,
        default:()=> null
    },
    phoneValue: {
        type: String || null || undefined,
        default:()=> null
    },
    dialingValue: {
        type: String || null || undefined,
        default:()=> null
    },
    selectWidth: {
        type: String,
        default: '20%'
    },
    selectPlaceholder: {
        type: String,
        default: 'Search'
    },
    phonePlaceholder: {
        type: String,
        default: 'Enter phone number'
    }
}
export type CountryTelInputProps = ExtractBasePropsType<typeof countryTelInputProps>;