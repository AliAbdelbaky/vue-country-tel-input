import type {CountryOption,SingleOption} from "@/_utils/country.types.ts";
import {ExtractBasePropsType} from "@/_utils/extractProps.ts";

import type {PropType} from 'vue'

export const selectInputProps = {
    value: {
        type: String || null,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: 'country'
    },
    options: {
        type: Object as PropType<CountryOption>,
        default: ()=>{}
    },
    theme: {
        type: String || null,
        default: null
    },
    invalid: {
        type: Boolean,
        default: false
    },
    width:{
        type:String,
        default:'20%'
    }
}

export type _SingleOption = SingleOption;
export type SelectInputProps = ExtractBasePropsType<typeof selectInputProps>;