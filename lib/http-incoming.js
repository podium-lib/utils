import { URL } from 'node:url';
import { Assets } from './assets.js';

const inspect = Symbol.for('nodejs.util.inspect.custom');

const urlFromRequest = (request) => {
    const protocol = request?.protocol || 'http';
    const host = request?.headers?.host || 'localhost';
    const url = request?.url || '';
    return new URL(url, `${protocol.replace(/:/, '')}://${host}`);
};

/**
 * @template {Record<string, unknown>} [T=Record<string, unknown>]
 * @template {Record<string, unknown>} [U=Record<string, unknown>]
 * @template {Record<string, unknown>} [V=Record<string, unknown>]
 * @typedef {object} PodiumHttpIncoming
 * @property {string} name
 * @property {U} context
 * @property {V} view
 * @property {URL} url
 * @property {Array<import('./asset-css.js').CssAsset | string>} css
 * @property {Array<import('./asset-js.js').JavaScriptAsset | string>} js
 * @property {T} [params]
 * @property {boolean} [development]
 * @property {boolean} [proxy]
 */

/**
 * @template {Record<string, unknown>} [T=Record<string, unknown>]
 * @template {Record<string, unknown>} [U=Record<string, unknown>]
 * @template {Record<string, unknown>} [V=Record<string, unknown>]
 */
export default class HttpIncoming {
    #development;
    #response;
    #request;
    /** @type {U} */
    #context;
    /** @type {T} */
    #params;
    #proxy;
    #name;
    /** @type {V} */
    #view;

    /**
     * @type {URL | undefined}
     */
    #url;

    /**
     * @type {Array<import('./asset-css.js').CssAsset | string>}
     */
    #css;

    /**
     * @type {Array<import('./asset-js.js').JavaScriptAsset | string>}
     */
    #js;

    /** @type {Assets} */
    assets = new Assets();

    /**
     * @constructor
     * @param {object} [request={}] The incoming HTTP request
     * @param {object} [response={}] The HTTP response
     * @param {T} [params={}] Parameters such as locale. Typically res.locals.
     *
     * @example
     * ```js
     * const incoming = new HttpIncoming(req, res, res.locals);
     * ```
     */
    // @ts-expect-error Not happy about the generics, but this is safe
    constructor(request = {}, response = {}, params = {}) {
        this.#development = false;
        this.#response = response;
        this.#request = request;
        // @ts-expect-error Not happy about the generics, but this is safe
        this.#context = {};
        this.#params = params;
        this.#proxy = false;
        this.#name = '';
        // @ts-expect-error Not happy about the generics, but this is safe
        this.#view = {};
        this.#url = undefined;
        this.#css = [];
        this.#js = [];
    }

    set development(value) {
        this.#development = value;
    }

    get development() {
        return this.#development;
    }

    /**
     * @throws {Error} Read only-property
     */
    set response(value) {
        throw new Error('Cannot set read-only property.');
    }

    get response() {
        return this.#response;
    }

    set request(value) {
        throw new Error('Cannot set read-only property.');
    }

    get request() {
        return this.#request;
    }

    set context(value) {
        this.#context = value;
    }

    get context() {
        return this.#context;
    }

    // No way to type writeonly properly at time of writing: https://github.com/microsoft/TypeScript/issues/21759
    // This is a workaround for a type error where TS complains we're trying to set a value to something that is type void.
    /**
     * @type {unknown}
     */
    set podlets(value) {
        const podlets = Array.isArray(value) ? value : [value];

        podlets.forEach((podlet) => {
            if (podlet.css) {
                podlet.css.forEach((item) => {
                    this.#css.push(item);
                });
            }

            if (podlet.js) {
                podlet.js.forEach((item) => {
                    this.#js.push(item);
                });
            }
        });
    }

    /**
     * @type {unknown}
     * @throws This prop is write only. Read from {@link css} and {@link js}.
     */
    get podlets() {
        throw new Error(
            `The getter for .podlets is reserved for later implementation`,
        );
    }

    set params(value) {
        throw new Error('Cannot set read-only property.');
    }

    /**
     * @returns {T}
     */
    get params() {
        return this.#params;
    }

    set proxy(value) {
        this.#proxy = value;
    }

    get proxy() {
        return this.#proxy;
    }

    set name(value) {
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set view(value) {
        this.#view = value;
    }

    get view() {
        return this.#view;
    }

    set url(value) {
        this.#url = new URL(value);
    }

    get url() {
        if (this.#url) return this.#url;
        return urlFromRequest(this.#request);
    }

    set css(value) {
        if (!Array.isArray(value))
            throw new Error(`Value for property ".css" must be an Array`);
        this.#css = value;
    }

    get css() {
        return this.#css;
    }

    set js(value) {
        if (!Array.isArray(value))
            throw new Error(`Value for property ".js" must be an Array`);
        this.#js = value;
    }

    get js() {
        return this.#js;
    }

    /**
     * @returns {PodiumHttpIncoming<T>}
     */
    toJSON() {
        return {
            development: this.development,
            context: this.context,
            params: this.params,
            proxy: this.proxy,
            name: this.name,
            view: this.view,
            url: this.url,
            css: this.css,
            js: this.js,
        };
    }

    [inspect]() {
        return {
            development: this.development,
            response: this.response,
            request: this.request,
            context: this.context,
            params: this.params,
            proxy: this.proxy,
            name: this.name,
            view: this.view,
            url: this.url,
            css: this.css,
            js: this.js,
        };
    }

    get [Symbol.toStringTag]() {
        return 'PodiumHttpIncoming';
    }
}
