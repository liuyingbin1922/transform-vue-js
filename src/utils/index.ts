
// tslint:disable-next-line
export function isFunction(value: unknown): value is Function {
    return Object.prototype.toString.call(value) === '[object Function]'
}

const camelizeRE = /-(\w)/g
/**
 * transform str to PascalCase
 */
export function camelize(str: string): string {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
// tslint:disable-next-line
export const SlotsMixin = {
    methods: {
        slots(name = 'default', props) {
            const { $slots, $scopedSlots } = this as any
            const scopeSlots = $scopedSlots[name]

            if (scopeSlots) {
                return scopeSlots(props)
            }

            return $slots[name]
        }
    }
}
