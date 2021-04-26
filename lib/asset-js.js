

import { uriIsRelative, pathnameBuilder } from './utils.js';
import { buildScriptElement, buildReactScriptAttributes } from './html-utils.js';

const inspect = Symbol.for('nodejs.util.inspect.custom');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
// NOTE: "nonce" is deliberately left out since we do not support inline scripts

const toUndefined = (value) => {
    if (Array.isArray(value) && value.length === 0) return undefined;
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

export default class PodiumAssetJs {
    #referrerpolicy;
    #crossorigin;
    #integrity;
    #pathname;
    #nomodule;
    #prefix;
    #value;
    #async;
    #defer;
    #type;
    #data;
    constructor({
        referrerpolicy = '',
        crossorigin = undefined,
        integrity = '',
        pathname = '',
        nomodule = false,
        prefix = false,
        value = undefined,
        async = false,
        defer = false,
        type = 'default',
        data = [],
    } = {}) {
        if (!toUndefined(value))
            throw new Error(
                `Value for argument variable "value", "${value}", is not valid`,
            );
        
        this.#pathname = pathname;
        this.#prefix = prefix;
        this.#value = value;

        this.#referrerpolicy = referrerpolicy;
        this.#crossorigin = crossorigin;
        this.#integrity = integrity;
        this.#nomodule = nomodule;
        this.#async = async;
        this.#defer = defer;
        this.#type = type;
        this.#data = data;
    }

    get referrerpolicy() {
        return this.#referrerpolicy;
    }

    set referrerpolicy(value) {
        this.#referrerpolicy = value;
    }

    get crossorigin() {
        return this.#crossorigin;
    }

    set crossorigin(value) {
        this.#crossorigin = value;
    }

    get integrity() {
        return this.#integrity;
    }

    set integrity(value) {
        this.#integrity = value;
    }

    get nomodule() {
        return this.#nomodule;
    }

    set nomodule(value) {
        this.#nomodule = value;
    }

    get value() {
        const pathname = this.#prefix ? this.#pathname : '';
        const value = this.#value;
        return uriIsRelative(value) ? pathnameBuilder(pathname, value) : value;
    }

    set value(value) {
        throw new Error('Cannot set read-only property.');
    }

    get async() {
        return this.#async;
    }

    set async(value) {
        this.#async = value;
    }

    get defer() {
        return this.#defer;
    }

    set defer(value) {
        this.#defer = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get data() {
        return this.#data;
    }

    set data(value) {
        this.#data = value;
    }

    get src() {
        return this.value;
    }

    set src(value) {
        throw new Error('Cannot set read-only property.');
    }

    toJSON() {
        return {
            referrerpolicy: toUndefined(this.referrerpolicy),
            crossorigin: this.crossorigin,
            integrity: toUndefined(this.integrity),
            nomodule: toUndefined(this.nomodule),
            value: this.#value,
            async: toUndefined(this.async),
            defer: toUndefined(this.defer),
            type: this.type,
            data: toUndefined(this.data),
        };
    }

    toHTML() {
        return buildScriptElement(this);
    }

    [inspect]() {
        return {
            referrerpolicy: this.referrerpolicy,
            crossorigin: this.crossorigin,
            integrity: this.integrity,
            nomodule: this.nomodule,
            value: this.value,
            async: this.async,
            defer: this.defer,
            type: this.type,
            data: this.data,
        };
    }

    toJsxAttributes() {
        return buildReactScriptAttributes(this);
    }

    get [Symbol.toStringTag]() {
        return 'PodiumAssetJs';
    }
};
