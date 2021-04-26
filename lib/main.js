import * as Incoming from "./http-incoming.js";
import { document } from "./html-document.js";
import * as Css from "./asset-css.js";
import * as Js from "./asset-js.js";
import * as utils from "./utils.js"
import * as html from "./html-utils.js"

export const {isString} = utils;
export const {isFunction} = utils;
export const {uriBuilder} = utils;
export const {uriIsRelative} = utils;
export const {pathnameBuilder} = utils;
export const {uriRelativeToAbsolute} = utils;
export const {setAtLocalsPodium} = utils;
export const {getFromLocalsPodium} = utils;
export const {duplicateOnLocalsPodium} = utils;
export const {serializeContext} = utils;
export const {deserializeContext} = utils;
export const {buildScriptElement} = html;
export const {buildLinkElement} = html;
export const HttpIncoming = Incoming;
export const template = document;
export const AssetCss = Css;
export const AssetJs = Js;
