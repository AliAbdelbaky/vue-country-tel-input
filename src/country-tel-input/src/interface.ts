import {ExtractBasePropsType} from "@/_utils/extractProps.ts";
import {PropType} from "vue";
import {Sizes} from "@/composables/themeTransformer.ts";

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
        type: String,
        default: null
    },
    countryValue: {
        type: String || null || undefined,
        // default:()=> null
    },
    phoneValue: {
        type: String || null || undefined,
        // default: null
    },
    dialingValue: {
        type: String || null || undefined,
        // default: null
    },
    selectWidth: {
        type: String,
        default: '20%'
    }
}
export type CountryTelInputProps = ExtractBasePropsType<typeof countryTelInputProps>;