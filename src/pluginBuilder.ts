// import type {App} from 'vue'
// import {CountryTelInput} from '@/country-tel-input'
// import {type IProps} from './assets/props.type'
// import {type ThemeType} from './assets/types/theme.type.ts'
//
// export type ThemeOverride = ThemeType
//
// export default {
//     install: (app: App, options: IProps = {
//         msg: "",
//         size: 'medium',
//         label: 'Phone Number',
//         showLabel: true,
//         showRequired: true,
//         selectWidth: '20%',
//         themeOverride: undefined
//     }) => {
//         app.component('VueCountryTelInput', CountryTelInput)
//         app.provide('size', options.size)
//         app.provide('label', options.label)
//         app.provide('showLabel', options.showLabel)
//         app.provide('showRequired', options.showRequired)
//         app.provide('selectWidth', options.selectWidth)
//         app.provide('themeOverride', options.themeOverride)
//     }
// }
// export {CountryTelInput}    // export the component and the theme type