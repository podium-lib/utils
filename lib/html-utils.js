'use strict';

const notEmpty = (value) => {
    if (value === false) return value;
    if (value === undefined) return false;
    if (value === null) return false;
    if (value !== '') return true;
    return false;
};

const buildScriptElement = (obj) => {
    const args = [];
    args.push(`src="${obj.value}"`);

    if (obj.type === 'esm' || obj.type === 'module') {
        args.push('type="module"');
    }

    if (notEmpty(obj.referrerpolicy)) {
        args.push(`referrerpolicy="${obj.referrerpolicy}"`);
    }

    if (obj.crossorigin || obj.crossorigin === '') {
        if (obj.crossorigin === true) args.push(`crossorigin`);
        else args.push(`crossorigin="${obj.crossorigin}"`);
    }

    if (notEmpty(obj.integrity)) {
        args.push(`integrity="${obj.integrity}"`);
    }

    if (notEmpty(obj.nomodule)) {
        args.push('nomodule');
    }

    if (notEmpty(obj.async)) {
        args.push('async');
    }

    if (notEmpty(obj.defer)) {
        args.push('defer');
    }

    if (Array.isArray(obj.data) && (obj.data.length !== 0)) {
        obj.data.forEach((item) => {
            args.push(`data-${item.key}="${item.value}"`);
        });
    }

    return `<script ${args.join(' ')}></script>`;
};

const buildLinkElement = (obj) => {
    const args = [];
    args.push(`href="${obj.value}"`);

    if (obj.crossorigin || obj.crossorigin === '') {
        if (obj.crossorigin === true) args.push(`crossorigin`);
        else args.push(`crossorigin="${obj.crossorigin}"`);
    }

    if (notEmpty(obj.disabled)) {
        args.push('disabled');
    }

    if (notEmpty(obj.hreflang)) {
        args.push(`hreflang="${obj.hreflang}"`);
    }

    if (notEmpty(obj.title)) {
        args.push(`title="${obj.title}"`);
    }

    if (notEmpty(obj.media)) {
        args.push(`media="${obj.media}"`);
    }

    if (notEmpty(obj.as)) {
        args.push(`as="${obj.as}"`);
    }

    if (notEmpty(obj.type)) {
        args.push(`type="${obj.type}"`);
    }

    if (notEmpty(obj.rel)) {
        args.push(`rel="${obj.rel}"`);
    }

    return `<link ${args.join(' ')}>`;
};

module.exports.buildScriptElement = buildScriptElement;
module.exports.buildLinkElement = buildLinkElement;
