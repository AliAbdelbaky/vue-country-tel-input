import {ExtractBasePropsType} from '@/_utils/extractProps.ts'
export const textInputProps = {
    value: {
        type: String || null,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    theme: {
        type: String || null,
        default: null
    },
    placeholder: String,
    invalid: {
        type: Boolean,
        default: false
    }
}
export type TextInputProps = ExtractBasePropsType<typeof textInputProps>;

export type TextInputValue = string | null
