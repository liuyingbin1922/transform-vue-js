import Vue, {
    VNode,
    VueConstructor,
    ComponentOptions,
    CreateElement,
    RenderContext
} from 'vue'
import { PropsDefinition, InjectOptions } from 'vue/types/options'

type ScopedSlot<Props = any> = (props?: Props) => VNode[] | VNode | undefined
interface DefaultSlots {
    default?: ScopedSlot
}
type ScopedSlots = DefaultSlots & {
    [key: string]: ScopedSlot | undefined
}

export type DefaultProps = Record<string, any>

export interface CreatorComponentOptions extends ComponentOptions<Vue> {
    functional?: boolean
    // tslint:disable-next-line
    install?: (Vue: VueConstructor) => void
}

export interface CreatorFunctionalComponentOptions<
    Props = DefaultProps,
    PropDefs = PropsDefinition<Props>
> {
    (
        h: CreateElement,
        props: Props,
        slots: ScopedSlots,
        context: RenderContext<Props>
    ): VNode | undefined
    props?: PropDefs
    model?: {
        prop?: string
        event?: string
    }
    inject?: InjectOptions
}

interface TsxBaseProps<Slots> {
    key: string | number
    // hack for jsx prop spread
    props: any
    class: any
    style: string | object[] | object
    scopedSlots: Slots
}

export type TsxComponent<Props, Events, Slots> = (
    props: Partial<Props & Events & TsxBaseProps<Slots>>
) => VNode

type Mod = string | Record<string, any>

export type Mods = Mod | Mod[]

export interface Options {
    prefix?: string
}
