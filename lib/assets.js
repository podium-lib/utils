import { EventEmitter } from 'node:events';

export class Assets extends EventEmitter {
    #expectedAssets = new Set();
    #receivedAssets = new Map();
    #js;
    #css;

    // pointless constructor with super to appease TS which cryptically errors otherwise.
    constructor() {
        super();
    }

    /**
     * Adds a new expected asset to the set
     * Expected assets are used to determine if all assets have been received
     * @param {string} name - The name of the asset
     */
    addExpectedAsset(name) {
        this.#expectedAssets.add(name);
    }

    /**
     * Adds a new received asset to the set
     * After each asset has been received, we check if all assets have been received
     * and emit the 'complete' event if so
     * @param {string} name - The name of the asset
     * @param {{js: Array<import('./asset-js.js').JavaScriptAsset | string>, css: Array<import('./asset-css.js').CssAsset | string>}} assets - The assets for a given resource
     */
    addReceivedAsset(name, assets = { js: [], css: [] }) {
        this.#receivedAssets.set(name, assets);
        if (this.allAssetsReceived) {
            const assets = Array.from(this.#receivedAssets.values());
            this.#js = assets.flatMap(({ js = [] }) => js).filter(Boolean);
            this.#css = assets.flatMap(({ css = [] }) => css).filter(Boolean);
            this.emit('received', { js: this.#js, css: this.#css });
        }
    }

    get js() {
        return this.#js;
    }

    get css() {
        return this.#css;
    }

    /**
     * Value will be true if all expected assets have been received
     */
    get allAssetsReceived() {
        return (
            this.#expectedAssets.size === this.#receivedAssets.size &&
            [...this.#expectedAssets].every((x) => this.#receivedAssets.has(x))
        );
    }
}
