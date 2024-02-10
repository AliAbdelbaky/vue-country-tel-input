import {type App, type Component, type DefineComponent} from 'vue'
import version from './version'
import type {CountryTelInputProps} from '@/country-tel-input'

type ComponentType = any

export interface AAQInstance {
    version: string
    componentPrefix: string
    install: (app: App, options?: Partial<CountryTelInputProps>) => void
}

interface AAQCreateOptions {
    components?: ComponentType[]
    componentPrefix?: string
}

function create({componentPrefix = 'Vue', components = []}: AAQCreateOptions = {}): AAQInstance {
    const installTargets: App[] = []

    function registerComponent(
        app: App,
        name: string,
        component: ComponentType,
        options: CountryTelInputProps
    ): void {

        const registered = app.component(componentPrefix + name)
        let provideKey = `${componentPrefix + name}Options`
        console.log('provideKey', provideKey)
        app.provide(provideKey, options)

        if (!registered) {
            app.component(
                componentPrefix + name,
                component as Component<any> | DefineComponent<any>
            )
        }
    }

    function install(app: App, options: CountryTelInputProps): void {
        if (installTargets.includes(app)) return
        installTargets.push(app)
        components.forEach((component) => {
            const {name, alias} = component
            registerComponent(app, name as string, component, options)
            if (alias) {
                alias.forEach((aliasName: string) => {
                    registerComponent(app, aliasName, component, options)
                })
            }
        })
    }

    return <AAQInstance>{
        version,
        componentPrefix,
        install
    }
}

export default create