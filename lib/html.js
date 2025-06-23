import escapeHtml from 'escape-html';

/**
 * Escape an untrusted string so it can be safely included in HTML.
 *
 * @param {unknown} string
 * @returns {string}
 */
export function escape(string) {
    return escapeHtml(string);
}

/**
 * Returns a {@link TemplateResult} with all values sanitized for HTML
 * to prevent cross-site scripting (XSS).
 *
 * There are two types of values that are _not_ sanitized:
 *
 *   1. Podlet responses ({@link PodiumClientResponse})
 *   2. {@link DangerouslyIncludeUnescapedHTML}
 *
 * Podlet responses must be passed in directly (i. e. `podlet`, not `podlet.content`).
 *
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 * @returns {TemplateResult}
 */
export function html(strings, ...values) {
    const result = [];
    for (let i = 0; i < values.length; i++) {
        result.push(strings[i]);
        const value = values[i];
        const tag = Object.prototype.toString.call(value);
        if (tag === '[object PodiumClientResponse]') {
            result.push(/** @type {{ content: string }} */ (value).content);
        } else if (tag === '[object DangerouslyIncludeUnescapedHTML]') {
            result.push(
                /** @type {DangerouslyIncludeUnescapedHTML} */ (value).content,
            );
        } else {
            result.push(escape(value));
        }
    }
    result.push(strings[strings.length - 1]);
    return new TemplateResult(result.join(''));
}

/**
 * Please confirm that you know you can trust the
 * content you pass in. Using this opens your app
 * for cross-site scripting (XSS) vulnerabilities
 * if you're not careful!
 *
 * @example
 * ```js
 * const content = "<p>HTML content</p>";
 * const dangerousHtml = new DangerouslyIncludeUnescapedHTML({ __content:  content });
 * return html`${dangerousHtml}`; // will include unsanitized "<p>HTML content</p>" as-is
 * ```
 */
export class DangerouslyIncludeUnescapedHTML {
    #content;

    constructor({ __content }) {
        this.#content = __content;
    }

    get content() {
        return this.#content;
    }

    get [Symbol.toStringTag]() {
        return 'DangerouslyIncludeUnescapedHTML';
    }
}

/**
 * Class returned by {@link html} so we can detect whether
 * or not it's been used in a `render` function.
 *
 * @internal
 */
export class TemplateResult {
    /**
     * @param {string} content
     */
    constructor(content) {
        this.content = content;
    }

    get [Symbol.toStringTag]() {
        return 'TemplateResult';
    }
}
