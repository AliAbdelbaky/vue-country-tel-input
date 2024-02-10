import {ExtractBasePropsType} from '@/_utils/extractProps'
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
    placeholder: {
        type: String || null,
        default: 'please input'
    },
    invalid: {
        type: Boolean,
        default: false
    }
}
export type TextInputProps = ExtractBasePropsType<typeof textInputProps>;

export type TextInputValue = string | null
