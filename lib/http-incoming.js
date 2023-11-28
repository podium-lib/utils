import { URL } from 'node:url';

const inspect = Symbol.for('nodejs.util.inspect.custom');

const urlFromRequest = request => {
    const protocol = request?.protocol || 'http';
    const host = request?.headers?.host || 'localhost';
    const url = request?.url || '';
    return new URL(url, `${protocol.replace(/:/, '')}://${host}`);
};

export default class HttpIncoming {
    #development;
    #response;
    #request;
    #context;
    #params;
    #proxy;
    #name;
    #view;
    #url;
    #css;
    #js;
    constructor(request = {}, response = {}, params = {}) {
        this.#development = false;
        this.#response = response;
        this.#request = request;
        this.#context = {};
        this.#params = params;
        this.#proxy = false;
        this.#name = '';
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

    set podlets(value) {
        const podlets = Array.isArray(value) ? value : [value];

        podlets.forEach(podlet => {
            if (podlet.css) {
                podlet.css.forEach(item => {
                    this.#css.push(item);
                });
            }

            if (podlet.js) {
                podlet.js.forEach(item => {
                    this.#js.push(item);
                });
            }
        });
    }

    get podlets() {
        throw new Error(
            `The getter for .podlets is reserved for later implementation`,
        );
    }

    set params(value) {
        throw new Error('Cannot set read-only property.');
    }

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
        return urlFromRequest(this.#request);;
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
};
