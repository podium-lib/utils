import * as utils from './html-utils.js';

/**
 * @param {import('./http-incoming.js').PodiumHttpIncoming} incoming Typically res.local.podium
 * @param {string} [body] HTML content for <body>
 * @param {string} [head] HTML content for <head>
 * @returns {string} HTML document as a string
 */
export const document = (incoming, body = '', head = '') => {
    let scripts = incoming.js;
    let styles = incoming.css;
    const lang =
        incoming.view.locale ||
        incoming.context['podium-locale'] ||
        incoming.context.locale ||
        incoming.params.locale ||
        'en-US';

    // backwards compatibility for scripts and styles
    if (typeof incoming.js === 'string')
        scripts = [{ type: 'default', value: incoming.js }];
    if (typeof incoming.css === 'string')
        styles = [{ type: 'text/css', value: incoming.css, rel: 'stylesheet' }];

    return /* html */ `<!doctype html>
<html lang="${lang}">
    <head>
        <meta charset="${incoming.view.encoding ? incoming.view.encoding : 'utf-8'}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        ${styles.map(utils.buildLinkElement).join('\n        ')}
        ${scripts
            .filter(
                (script) =>
                    typeof script !== 'string' &&
                    script.strategy === 'beforeInteractive',
            )
            .map(utils.buildScriptElement)
            .join('\n        ')}
        <title>${incoming.view.title ? incoming.view.title : ''}</title>
        ${head}
    </head>
    <body>
        ${body}
        ${scripts
            .filter(
                (script) =>
                    typeof script === 'string' ||
                    script.strategy === 'afterInteractive' ||
                    !script.strategy,
            )
            .map(utils.buildScriptElement)
            .join('\n        ')}
        ${scripts
            .filter(
                (script) =>
                    typeof script !== 'string' && script.strategy === 'lazy',
            )
            .map(
                (script) =>
                    `<script type="module">import("${
                        typeof script !== 'string' ? script.value : script
                    }")</script>`,
            )
            .join('\n        ')}
    </body>
</html>`;
};
