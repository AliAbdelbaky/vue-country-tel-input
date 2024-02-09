export const SelectInputProps = {
    modelValue: {
        type: [String, Number],
        default: ''
    },
    size: {
        type: String,
        default: 'medium'
    },
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    autocomplete: {
        type: String,
        default: 'off'
    },
    name: String,
    readonly: Boolean,
    autofocus: Boolean,
    tabindex: Number,
    onClear: Function,
    onFocus: Function,
    onBlur: Function,
    onChange: Function,
    onInput: Function,
    onKeydown: Function,
    onKeyup: Function,
    'onUpdate:modelValue': Function
} as const