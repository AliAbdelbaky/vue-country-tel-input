import {PropType} from "vue";
import {CountryOption, SingleOption} from "@/_utils/country.types.ts";
import {ExtractBasePropsType} from "@/_utils/extractProps.ts";

export const popoverProps = {
    options: Object as PropType<CountryOption>,
    style: {
        type: Object as PropType<CSSStyleDeclaration>,
        default: null
    },
    renderLabel: {
        type: Function as PropType<(item: SingleOption) => void>,
        default: (item: SingleOption) => item.label
    },
    activeValue: String || null,
    theme: {
        type: String || null,
        default: null
    }
}

export type PopoverProps = ExtractBasePropsType<typeof popoverProps>;