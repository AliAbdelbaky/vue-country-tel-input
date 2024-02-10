import * as components from './components'
import create from './create'

const aaq = create({
    components: Object.keys(components).map(
        (key) => components[key as keyof typeof components]
    )
})

export default aaq
export const install = aaq.install
