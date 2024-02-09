import {ExtractBasePropsType} from '@/_utils/extractProps.ts'
export const inputGroupProps = {
    theme: {
        type: String || null,
        default: null
    },
    label: {
        type: String || null,
        default: null
    },
    showRequired: {
        type: Boolean,
        default: true
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    selectWidth: {
        type: String,
        default: '20%'
    },
    errors:{
        type: Array || [],
        default: []
    }
}
export type InputGroupProps = ExtractBasePropsType<typeof inputGroupProps>;
// /**
//  * The size of the input group
//  *
//  * @default 'medium'
//  */
// size?: 'small' | 'medium' | 'large'
// /**
//  * The placement of the input group
//  *
//  * @default 'left'
//  */
// placement?: 'left' | 'right'
// /**
//  * The width of the input group
//  *
//  * @default 'auto'
//  */
// width?: string | number
// /**
//  * The width of the input
//  *
//  * @default 'auto'
//  */
// inputWidth?: string | number
// /**
//  * The width of the button
//  *
//  * @default 'auto'
//  */
// buttonWidth?: string | number
// /**
//  * The button type
//  *
//  * @default 'default'
//  */
// buttonType?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
// /**
//  * The button size
//  *
//  * @default 'medium'
//  */
// buttonSize?: 'small' | 'medium' | 'large'
// /**
//  * The button icon
//  */
// buttonIcon?: string
// /**
//  * The button text
//  */
// buttonText?: string
// /**
//  * The button loading state
//  *
//  * @default false
//  */
// buttonLoading?: boolean
// /**
//  * The button disabled state
//  *
//  * @default false
//  */
// buttonDisabled?: boolean
// /**
//  * The button native type
//  *
//  * @default 'button'
//  */
// buttonNativeType?: 'button' | 'submit' | 'reset'
// /**
//  * The button click event
//  */
// onButtonClick?: (e: MouseEvent) => void
//     /**
//      * The input type
//      *
//      * @default 'text'
//      */
//     inputType?: string
// /**
//  * The input value
//  */
// inputValue?: string | number
// /**
//  * The input placeholder
//  */
// inputPlaceholder?: string
// /**
//  * The input disabled state
//  *
//  * @default false
//  */
// inputDisabled?: boolean
// /**
//  * The input readonly state
//  *
//  * @default false
//  */
// inputReadonly?: boolean
// /**
//  * The input change event
//  */
// onInputChange?: (e: Event) => void