'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// tslint:disable-next-line
function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
}
var camelizeRE = /-(\w)/g;
/**
 * transform str to PascalCase
 */
function camelize(str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
}
/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
// tslint:disable-next-line
var SlotsMixin = {
    methods: {
        slots: function (name, props) {
            if (name === void 0) { name = 'default'; }
            var _a = this, $slots = _a.$slots, $scopedSlots = _a.$scopedSlots;
            var scopeSlots = $scopedSlots[name];
            if (scopeSlots) {
                return scopeSlots(props);
            }
            return $slots[name];
        }
    }
};

// unify slots & scopedSlots
function unifySlots(context) {
    // use data.scopedSlots in lower Vue version
    var scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
    // an Object contains all slots
    var slots = context.slots();
    Object.keys(slots).forEach(function (key) {
        if (!scopedSlots[key]) {
            scopedSlots[key] = function () { return slots[key]; };
        }
    });
    return scopedSlots;
}
function transformFunctionComponent(pure) {
    return {
        functional: true,
        props: pure.props,
        model: pure.model,
        render: function (h, context) {
            return pure(h, context.props, unifySlots(context), context);
        }
    };
}
// tslint:disable-next-line
function install(Vue) {
    var name = this.name;
    Vue.component(name, this);
    Vue.component(camelize("-" + name), this);
}
function createComponent(name) {
    return function (sfc) {
        if (isFunction(sfc)) {
            sfc = transformFunctionComponent(sfc);
        }
        if (!sfc.functional) {
            sfc.mixins = sfc.mixins || [];
            sfc.mixins.push(SlotsMixin);
        }
        sfc.name = name;
        sfc.install = install;
        return sfc;
    };
}

exports.createComponent = createComponent;
exports.unifySlots = unifySlots;
