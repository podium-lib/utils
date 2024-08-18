import { uriIsRelative, pathnameBuilder } from './utils.js';
import {
    buildScriptElement,
    buildReactScriptAttributes,
} from './html-utils.js';

const inspect = Symbol.for('nodejs.util.inspect.custom');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
// NOTE: "nonce" is deliberately left out since we do not support inline scripts

/**
 * Returns the value, or undefined if the value is false, an empty array or an empty string.
 * @template T
 * @param {T} value
 * @returns {T | undefined}
 */
const toUndefined = (value) => {
    if (Array.isArray(value) && value.length === 0) return undefined;
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

/**
 * @typedef {object} JavaScriptAsset
 * @property {string} [referrerpolicy]
 * @property {string | boolean} [crossorigin]
 * @property {string} [integrity]
 * @property {boolean} [nomodule]
 * @property {string} value
 * @property {boolean} [async]
 * @property {boolean} [defer]
 * @property {string} [type]
 * @property {Array<{ key: string; value?: unknown }>} [data]
 * @property {string} [strategy]
 * @property {string} [scope]
 */

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
    #strategy;
    #scope;

    /**
     * @constructor
     * @param {object} options
     * @param {string | null} [options.referrerpolicy]
     * @param {boolean | string | null} [options.crossorigin]
     * @param {string | null} [options.integrity]
     * @param {string | null} [options.pathname]
     * @param {boolean | null} [options.nomodule=false]
     * @param {boolean | null} [options.prefix=false]
     * @param {string | null} [options.value]
     * @param {boolean | null} [options.async=false]
     * @param {boolean | null} [options.defer=false]
     * @param {string | null} [options.type="default"]
     * @param {array} [options.data]
     * @param {string | null} [options.strategy]
     * @param {string | null} [options.scope]
     */
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
        strategy = undefined,
        scope = undefined,
    } = {}) {
        if (!toUndefined(value)) {
            throw new Error(
                `Value for argument variable "value", "${value}", is not valid`,
            );
        }

        this.#pathname = pathname;
        this.#prefix = prefix;
        this.#value = value;

        this.#referrerpolicy = referrerpolicy;
        this.#crossorigin = crossorigin;
        this.#integrity = integrity;
        this.#nomodule = nomodule;

        if (async && defer) {
            this.#async = false;
            this.#defer = true;
        } else {
            this.#async = async;
            this.#defer = defer;
        }

        this.#type = type;
        this.#data = data;
        this.#strategy = strategy;
        this.#scope = scope;
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

    get strategy() {
        return this.#strategy;
    }

    set strategy(value) {
        this.#strategy = value;
    }

    get scope() {
        return this.#scope;
    }

    set scope(value) {
        this.#scope = value;
    }

    /**
     * @returns {JavaScriptAsset}
     */
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
            strategy: toUndefined(this.strategy),
            scope: toUndefined(this.scope),
        };
    }

    toHTML() {
        return buildScriptElement(this);
    }

    toEarlyHint() {
        const attrs = Object.entries(this.toJSON())
            .filter(([key, value]) => value && key !== 'value')
            .flatMap(([key, value]) => {
                if (key === 'data') {
                    // @ts-ignore
                    return value.map(
                        ({ key, value }) => `data-${key}=${value}`,
                    );
                }
                return [`${key}=${value}`];
            });
        return `<${this.#value}>; ${attrs.join('; ')}`;
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
}
