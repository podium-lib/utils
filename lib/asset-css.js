import { uriIsRelative, pathnameBuilder } from './utils.js';
import { buildLinkElement, buildReactLinkAttributes } from './html-utils.js';

const inspect = Symbol.for('nodejs.util.inspect.custom');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
// NOTE: Only includes attributes used for loading CSS

/**
 * Returns the value, or undefined if the value is false or an empty string.
 * @template T
 * @param {T} value
 * @returns {T | undefined}
 */
const toUndefined = (value) => {
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

/**
 * @typedef {object} CssAsset
 * @property {string} value
 * @property {string} [type]
 * @property {string} [rel]
 * @property {string | boolean} [crossorigin]
 * @property {string} [hreflang=""]
 * @property {boolean} [prefix=false]
 * @property {boolean} [disabled=false]
 * @property {string} [pathname=""]
 * @property {string} [title=""]
 * @property {string} [media=""]
 * @property {string} [as=""]
 * @property {string} [strategy]
 * @property {string} [scope]
 */

export default class PodiumAssetCss {
    #crossorigin;
    #pathname;
    #disabled;
    #hreflang;
    #prefix;
    #title;
    #value;
    #media;
    #type;
    #rel;
    #as;
    #strategy;
    #scope;

    /**
     * @constructor
     * @param {object} options
     * @param {boolean | string | null} [options.crossorigin]
     * @param {string | null} [options.hreflang=""]
     * @param {boolean | null} [options.prefix=false]
     * @param {boolean | null} [options.disabled=false]
     * @param {string | null} [options.pathname=""]
     * @param {string | null} [options.title=""]
     * @param {string | null} [options.media=""]
     * @param {string | null} [options.type="text/css"]
     * @param {string | null} [options.rel="stylesheet"]
     * @param {string | null} [options.as=""]
     * @param {string | null} [options.value]
     * @param {string | null} [options.strategy]
     * @param {string | null} [options.scope]
     */
    constructor({
        crossorigin = undefined,
        pathname = '',
        disabled = false,
        hreflang = '',
        prefix = false,
        title = '',
        value = undefined,
        media = '',
        type = 'text/css',
        rel = 'stylesheet',
        as = '',
        strategy = undefined,
        scope = undefined,
    } = {}) {
        if (!toUndefined(value))
            throw new Error(
                `Value for argument variable "value", "${value}", is not valid`,
            );

        this.#pathname = pathname;
        this.#prefix = prefix;
        this.#value = value;

        this.#crossorigin = crossorigin;
        this.#disabled = disabled;
        this.#hreflang = hreflang;
        this.#title = title;
        this.#media = media;
        this.#type = type;
        this.#rel = rel;
        this.#as = as;
        this.#strategy = strategy;
        this.#scope = scope;
    }

    get crossorigin() {
        return this.#crossorigin;
    }

    set crossorigin(value) {
        this.#crossorigin = value;
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(value) {
        this.#disabled = value;
    }

    get hreflang() {
        return this.#hreflang;
    }

    set hreflang(value) {
        this.#hreflang = value;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get value() {
        const pathname = this.#prefix ? this.#pathname : '';
        const value = this.#value;
        return uriIsRelative(value) ? pathnameBuilder(pathname, value) : value;
    }

    set value(value) {
        throw new Error('Cannot set read-only property.');
    }

    get media() {
        return this.#media;
    }

    set media(value) {
        this.#media = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get href() {
        return this.value;
    }

    set href(value) {
        throw new Error('Cannot set read-only property.');
    }

    get rel() {
        return this.#rel;
    }

    set rel(value) {
        this.#rel = value;
    }

    get as() {
        return this.#as;
    }

    set as(value) {
        this.#as = value;
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
     * @returns {CssAsset}
     */
    toJSON() {
        return {
            crossorigin: toUndefined(this.crossorigin),
            disabled: toUndefined(this.disabled),
            hreflang: toUndefined(this.hreflang),
            title: toUndefined(this.title),
            value: this.#value,
            media: toUndefined(this.media),
            type: this.type,
            rel: this.rel,
            as: toUndefined(this.as),
            strategy: toUndefined(this.strategy),
            scope: toUndefined(this.scope),
        };
    }

    toHTML() {
        return buildLinkElement(this);
    }

    toHeader() {
        const attrs = Object.entries(this.toJSON())
            .filter(([key, value]) => value && key !== 'value')
            .map(([key, value]) => `${key}=${value}`);
        return `<${this.#value}>; ${attrs.join('; ')}; asset-type=style`;
    }

    [inspect]() {
        return {
            crossorigin: this.crossorigin,
            disabled: this.disabled,
            hreflang: this.hreflang,
            title: this.title,
            value: this.value,
            media: this.media,
            type: this.type,
            rel: this.rel,
            as: this.as,
        };
    }

    toJsxAttributes() {
        return buildReactLinkAttributes(this);
    }

    get [Symbol.toStringTag]() {
        return 'PodiumAssetCss';
    }
}
