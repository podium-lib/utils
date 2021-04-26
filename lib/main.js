import HttpIncoming from '../lib/http-incoming.js';
import { document } from '../lib/html-document.js';
import AssetCss from '../lib/asset-css.js';
import AssetJs from '../lib/asset-js.js';
import * as utils from '../lib/utils.js'
import * as html from '../lib/html-utils.js'

export const isString = utils.isString;
export const isFunction = utils.isFunction;
export const uriBuilder = utils.uriBuilder;
export const uriIsRelative = utils.uriIsRelative;
export const pathnameBuilder = utils.pathnameBuilder;
export const uriRelativeToAbsolute = utils.uriRelativeToAbsolute;
export const setAtLocalsPodium = utils.setAtLocalsPodium;
export const getFromLocalsPodium = utils.getFromLocalsPodium;
export const duplicateOnLocalsPodium = utils.duplicateOnLocalsPodium;
export const serializeContext = utils.serializeContext;
export const deserializeContext = utils.deserializeContext;
export const buildScriptElement = html.buildScriptElement;
export const buildLinkElement = html.buildLinkElement;
export const HttpIncoming = HttpIncoming;
export const template = document;
export const AssetCss = AssetCss;
export const AssetJs = AssetJs;
