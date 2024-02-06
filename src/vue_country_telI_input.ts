import type {App} from 'vue'
import {VueCountryTellInput} from './components/index.ts'
import {type IProps} from './assets/props.type.ts'
import {type ThemeType} from './assets/types/theme.type.ts'
export type ThemeOverride = ThemeType

export default {
    install: (app: App, options: IProps = {
        msg: "",
        size: 'medium',
        label: 'Phone Number',
        showLabel: true,
        showRequired: true,
        selectWidth: '20%',
    }) => {
        app.component('VueCountryTellInput', VueCountryTellInput)
        app.provide('msg', options.msg)
        app.provide('size', options.size)
        app.provide('label', options.label)
        app.provide('showLabel', options.showLabel)
        app.provide('showRequired', options.showRequired)
        app.provide('selectWidth', options.selectWidth)
    }
}
export {VueCountryTellInput}    // export the component and the theme type