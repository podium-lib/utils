'use strict';

const { uriIsRelative, pathnameBuilder } = require('./utils');
const { buildLinkElement } = require('./html-utils');

const inspect = Symbol.for('nodejs.util.inspect.custom');

// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
// NOTE: Only includes attributes used for loading CSS

const toUndefined = value => {
    if (value === false) return undefined;
    if (value === '') return undefined;
    return value;
};

const PodiumAssetCss = class PodiumAssetCss {
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
        };
    }

    toHTML() {
        return buildLinkElement(this);
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

    get [Symbol.toStringTag]() {
        return 'PodiumAssetCss';
    }
};

module.exports = PodiumAssetCss;
