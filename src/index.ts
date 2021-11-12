import { RenderContext } from 'vue'
import {
    CreatorComponentOptions,
    CreatorFunctionalComponentOptions,
    DefaultProps,
    TsxComponent
} from './types/index'

import { isFunction, camelize, SlotsMixin } from './utils/index'

// unify slots & scopedSlots
export function unifySlots(context: RenderContext) {
    // use data.scopedSlots in lower Vue version
    const scopedSlots = context.scopedSlots || context.data.scopedSlots || {}

    // an Object contains all slots
    const slots = context.slots()

    Object.keys(slots).forEach(key => {
        if (!scopedSlots[key]) {
            scopedSlots[key] = () => slots[key]
        }
    })

    return scopedSlots
}

function transformFunctionComponent(
    pure: CreatorFunctionalComponentOptions
): CreatorComponentOptions {
    return {
        functional: true,
        props: pure.props,
        model: pure.model,
        render: (h, context): any =>
            pure(h, context.props, unifySlots(context), context)
    }
}

// tslint:disable-next-line
function install(this, Vue) {
    const { name } = this
    Vue.component(name as string, this)
    Vue.component(camelize(`-${name}`), this)
}

export function createComponent(name: string) {
    return function<Props = DefaultProps, Events = {}, Slots = {}>(
        sfc: CreatorComponentOptions | CreatorFunctionalComponentOptions
    ): TsxComponent<Props, Events, Slots> {
        if (isFunction(sfc)) {
            sfc = transformFunctionComponent(sfc)
        }

        if (!sfc.functional) {
            sfc.mixins = sfc.mixins || []
            sfc.mixins.push(SlotsMixin)
        }

        sfc.name = name
        sfc.install = install

        return sfc as TsxComponent<Props, Events, Slots>
    }
}
