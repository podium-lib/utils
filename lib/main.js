import HttpIncoming from './http-incoming.js';
import AssetCss from './asset-css.js';
import AssetJs from './asset-js.js';
import { document as template } from './html-document.js';
import { buildScriptElement, buildLinkElement } from './html-utils.js';
import {
    html,
    escape,
    DangerouslyIncludeUnescapedHTML,
    TemplateResult,
} from './html.js';
import {
    duplicateOnLocalsPodium,
    uriRelativeToAbsolute,
    getFromLocalsPodium,
    deserializeContext,
    setAtLocalsPodium,
    serializeContext,
    pathnameBuilder,
    uriIsRelative,
    uriBuilder,
    isFunction,
    isString,
} from './utils.js';

/**
 * @typedef {import('./asset-css.js').CssAsset} PodiumCssAsset
 */

/**
 * @typedef {import('./asset-js.js').JavaScriptAsset} PodiumJavaScriptAsset
 */

/**
 * @typedef {import('./http-incoming.js').PodiumHttpIncoming} PodiumHttpIncoming
 */

export {
    HttpIncoming,
    AssetCss,
    AssetJs,
    template,
    buildLinkElement,
    buildScriptElement,
    duplicateOnLocalsPodium,
    uriRelativeToAbsolute,
    getFromLocalsPodium,
    deserializeContext,
    setAtLocalsPodium,
    serializeContext,
    pathnameBuilder,
    uriIsRelative,
    uriBuilder,
    isFunction,
    isString,
    html,
    escape,
    DangerouslyIncludeUnescapedHTML,
    TemplateResult,
};
