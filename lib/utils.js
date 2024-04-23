import camelcase from 'camelcase';
import { URL } from 'node:url';

/**
 * Checks if a value is a string.
 *
 * @param {unknown} [str] A value to check
 * @returns {boolean}
 */
export const isString = (str) => typeof str === 'string';

/**
 * Checks if a value is a function.
 *
 * @param {unknown} [fn] A value to check
 * @returns {boolean}
 */
export const isFunction = (fn) => {
    const type = {}.toString.call(fn);
    return type === '[object Function]' || type === '[object AsyncFunction]';
};

/**
 * Constructs a pathname out of pathname fragments. Will remove duplicate "/"
 * characters and return a pathname without a trailing "/". If the first
 * argument starts with a "/" it will be perserved.
 *
 * @param {string[] | Array<string | string[]>} args Pathnames to combine.
 * @returns {string} The combined pathname.
 */
export const pathnameBuilder = (...args) => {
    const separator = '/';
    let prefixCheck = true;
    let prefix = '';

    if (args.length === 0) {
        return '';
    }

    const parts = args
        .flat()
        .filter((arg) => {
            if (isString(arg) && arg.length !== 0 && !arg.startsWith('http')) {
                return true;
            }
            return false;
        })
        .map((arg) => {
            if (prefixCheck) {
                prefixCheck = false;
                if (arg.charAt(0) === separator) {
                    prefix = separator;
                }
            }
            return arg.split(separator).filter((item) => item);
        })
        .flat();

    return `${prefix}${parts.join(separator)}`;
};

/**
 * Constructs an absolute URI out of a absolute manifest URI
 * and a relative URI.
 *
 * @param {string} input Relative URI.
 * @param {string} base Absolute manifest URI to append the input too.
 * @param {string} [extra] Relative path to be appended at the end of the URI.
 * @returns {string} An absolute URI.
 */
export const uriBuilder = (input = '', base = '', extra = '') => {
    const uriObj = new URL(base);
    const basePath = uriObj.pathname
        .split('/')
        .filter((item) => item && !item.includes('.json'));
    uriObj.pathname = pathnameBuilder(basePath, input, extra);
    return uriObj.toString();
};

/**
 * Checks if a URI is relative.
 *
 * @param {string} uri A URI to check
 * @returns {boolean}
 */
export const uriIsRelative = (uri) => uri.substr(0, 4) !== 'http';

/**
 * Check if a URI is absolute or relative and if relative compose an
 * absolute URI out of a absolute mainfest URI.
 *
 * @param {string} input Relative or absolute URI.
 * @param {string} base Absolute manifest URI to append the possible relative input to.
 * @param {string} extra Relative path to be appended at the end of the URI.
 * @returns {string} An absolute URI.
 */
export const uriRelativeToAbsolute = (input = '', base = '', extra = '') => {
    if (uriIsRelative(input)) {
        return uriBuilder(input, base, extra);
    }
    return input;
};

/**
 * Set a value on a property on .locals.podium on an HTTP response object.
 * Ensures that .locals.podium exists on the http response object.
 *
 * If property is not provided, .locals.podium will be created, if not
 * already existing, on the response object.
 *
 * @param {object} [response] An HTTP response object.
 * @param {string} [property] Property for the value.
 * @param {unknown} [value] Value to store on the property.
 * @returns {object} The http response object
 */
export const setAtLocalsPodium = (response = {}, property, value) => {
    if (!response.locals) {
        response.locals = {};
    }

    if (!response.locals.podium) {
        response.locals.podium = {};
    }

    if (isString(property) && property !== '') {
        response.locals.podium[property] = value;
    }

    return response;
};

/**
 * Get the value from a property on .locals.podium on an HTTP response object.
 * Ensures that .locals.podium exists on the http response object.
 *
 * @param {object} [response] An HTTP response object.
 * @param {string} [property] Property for the value.
 * @returns {object | null} The property, or `null` if it does not exist.
 */
export const getFromLocalsPodium = (response = {}, property) => {
    if (!response.locals) {
        return null;
    }

    if (!response.locals.podium) {
        return null;
    }

    if (isString(property) && property !== '') {
        return response.locals.podium[property];
    }

    return null;
};

/**
 * Copies the value from one property to another on .locals.podium on an HTTP response object.
 *
 * @param {object} response An HTTP response object.
 * @param {string} [fromProperty] Property for the existent value.
 * @param {string} [toProperty] Property for the duplicated value.
 * @returns {object} The updated HTTP response object.
 */
export const duplicateOnLocalsPodium = (
    response = {},
    fromProperty,
    toProperty,
) =>
    setAtLocalsPodium(
        response,
        toProperty,
        getFromLocalsPodium(response, fromProperty),
    );

/**
 * Serialize a context object into an HTTP header object, calling the function if a context value is callable.
 *
 * @param {object} [headers={}] An HTTP headers object the context will be copied to.
 * @param {object} [context={}]  A context object to copy from.
 * @param {unknown} [arg=""] An argument value passed on to the function if a context value is a function.
 * @returns {object} An object with deserialized context properties and values.
 *
 * @see {@link deserializeContext}
 *
 * @example
 * ```js
 * let headers = {};
 * const context = {
 *  'podium-public-pathname': 'podium-resource',
 * };
 * headers = serializeContext(headers, context);
 * // headers: { 'podium-public-pathname': 'podium-resource' }
 * ```
 */
export const serializeContext = (headers = {}, context = {}, arg = '') => {
    const localHeaders = headers;
    Object.keys(context).forEach((key) => {
        if (isString(context[key])) {
            localHeaders[key] = context[key];
        }

        if (isFunction(context[key])) {
            localHeaders[key] = context[key](arg);
        }
    });
    return localHeaders;
};

/**
 * Deserialize a context object from an HTTP header object.
 *
 * @param {object} [headers={}] An HTTP headers object the context will be extracted from.
 * @param {string} [prefix="podium"] The prefix used to mark what properties are context properties.
 * @returns {object} An object with deserialized context properties and values.
 *
 * @see {@link serializeContext}
 *
 * @example
 * ```js
 * const headers = {
 *   'podium-public-pathname': 'podium-resource',
 * };
 * const context = deserializeContext(headers);
 * // { publicPathname: 'podium-resource' }
 * ```
 */
export const deserializeContext = (headers = {}, prefix = 'podium') => {
    const context = {};
    Object.keys(headers).forEach((key) => {
        if (key.startsWith(prefix)) {
            const k = camelcase(key.replace(`${prefix}-`, ''));
            context[k] = headers[key];
        }
    });
    return context;
};
