import {ExtractBasePropsType} from "@/_utils/extractProps.ts";

export const countryTelInputProps = {
    size: {
        type: String,
        default: 'default'
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
        type: String,
        default: null
    },
    countryValue: {
        type: String || null,
        default: null
    },
    phoneValue: {
        type: String || null,
        default: null
    },
    selectWidth: {
        type: String,
        default: '20%'
    }
}
export type CountryTelInputProps = ExtractBasePropsType<typeof countryTelInputProps>;