'use strict';

const AssetCss = require('../lib/asset-css');
const AssetJs = require('../lib/asset-js');
const utils = require('../lib/html-utils');

/**
 * .buildLinkElement()
 */

test('.buildLinkElement() - "value" property has a value - should appended "href" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "crossorigin" property has a value - should appended "crossorigin" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        crossorigin: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" crossorigin="bar" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "disabled" property is "true" - should appended "disabled" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        disabled: true,
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" disabled type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "hreflang" property has a value - should appended "hreflang" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        hreflang: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" hreflang="bar" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "title" property has a value - should appended "title" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        title: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" title="bar" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "media" property has a value - should appended "media" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        media: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" media="bar" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "as" property has a value - should appended "as" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        as: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" as="bar" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - "type" property has a value - should appended "type" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        type: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual('<link href="/foo" type="bar" rel="stylesheet">');
});

test('.buildLinkElement() - "rel" property has a value - should appended "rel" attribute to element', () => {
    const obj = new AssetCss({
        value: '/foo',
        rel: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual('<link href="/foo" type="text/css" rel="bar">');
});

test('.buildLinkElement() - properties are "undefined" - should NOT appended attributes to element', () => {
    const obj = new AssetCss({
        crossorigin: undefined,
        disabled: undefined,
        hreflang: undefined,
        title: undefined,
        media: undefined,
        value: '/foo',
        type: undefined,
        rel: undefined,
        as: undefined,
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
});

test('.buildLinkElement() - properties are "null" - should NOT appended attributes to element', () => {
    const obj = new AssetCss({
        crossorigin: null,
        disabled: null,
        hreflang: null,
        title: null,
        media: null,
        value: '/foo',
        type: null,
        rel: null,
        as: null,
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual('<link href="/foo">');
});

test('.buildLinkElement() - properties are "false" - should NOT appended attributes to element', () => {
    const obj = new AssetCss({
        crossorigin: false,
        disabled: false,
        hreflang: false,
        title: false,
        media: false,
        value: '/foo',
        type: false,
        rel: false,
        as: false,
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual('<link href="/foo">');
});

test('.buildLinkElement() - properties are empty string - should NOT appended attributes to element', () => {
    const obj = new AssetCss({
        crossorigin: '',
        disabled: '',
        hreflang: '',
        title: '',
        media: '',
        value: '/foo',
        type: '',
        rel: '',
        as: '',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual('<link href="/foo" crossorigin="">');
});

test('.buildLinkElement() - crossorigin boolean true', () => {
    const obj = new AssetCss({
        crossorigin: true,
        value: '/bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        `<link href="/bar" crossorigin type="text/css" rel="stylesheet">`,
    );
});

test('.buildLinkElement() - crossorigin boolean false', () => {
    const obj = new AssetCss({
        crossorigin: false,
        value: '/bar',
    });
    const result = utils.buildLinkElement(obj);
    expect(result).toEqual(
        `<link href="/bar" type="text/css" rel="stylesheet">`,
    );
});

/**
 * .buildScriptElement()
 */

test('.buildScriptElement() - "value" property has a value - should appended "src" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - "type" property has "module" as value - should appended "type" attribute with "module" as value to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'module',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" type="module"></script>');
});

test('.buildScriptElement() - "type" property has "esm" as value - should appended "type" attribute with "module" as value to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'esm',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" type="module"></script>');
});

test('.buildScriptElement() - "type" property has "cjs" as value - should NOT appended a attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'cjs',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - "referrerpolicy" property has a value - should appended "referrerpolicy" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        referrerpolicy: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" referrerpolicy="bar"></script>');
});

test('.buildScriptElement() - "crossorigin" property has a value - should appended "crossorigin" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        crossorigin: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" crossorigin="bar"></script>');
});

test('.buildScriptElement() - "integrity" property has a value - should appended "integrity" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        integrity: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" integrity="bar"></script>');
});

test('.buildScriptElement() - "nomodule" property is "true" - should appended "nomodule" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        nomodule: true,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" nomodule></script>');
});

test('.buildScriptElement() - "async" property is "true" - should appended "async" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        async: true,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" async></script>');
});

test('.buildScriptElement() - "data" property has a value - should appended "data" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        data: [{ 
            key: 'foo',
            value: 'bar'     
        }],
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" data-foo="bar"></script>');
});

test('.buildScriptElement() - "defer" property is "true" - should appended "defer" attribute to element', () => {
    const obj = new AssetJs({
        value: '/foo',
        defer: true,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo" defer></script>');
});

test('.buildScriptElement() - properties are "undefined" - should NOT appended attributes to element', () => {
    const obj = new AssetJs({
        referrerpolicy: undefined,
        crossorigin: undefined,
        integrity: undefined,
        nomodule: undefined,
        async: undefined,
        defer: undefined,
        value: '/foo',
        type: undefined,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - properties are "null" - should NOT appended attributes to element', () => {
    const obj = new AssetJs({
        referrerpolicy: null,
        crossorigin: null,
        integrity: null,
        nomodule: null,
        async: null,
        defer: null,
        value: '/foo',
        type: null,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - properties are "false" - should NOT appended attributes to element', () => {
    const obj = new AssetJs({
        referrerpolicy: false,
        crossorigin: false,
        integrity: false,
        nomodule: false,
        async: false,
        defer: false,
        value: '/foo',
        type: false,
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - properties are empty string - should NOT appended attributes to element', () => {
    const obj = new AssetJs({
        referrerpolicy: '',
        integrity: '',
        nomodule: '',
        async: '',
        defer: '',
        value: '/foo',
        type: '',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual('<script src="/foo"></script>');
});

test('.buildScriptElement() - crossorigin empty string', () => {
    const obj = new AssetJs({
        crossorigin: '',
        value: '/foo',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual(`<script src="/foo" crossorigin=""></script>`);
});

test('.buildScriptElement() - crossorigin boolean true', () => {
    const obj = new AssetJs({
        crossorigin: true,
        value: '/bar',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual(`<script src="/bar" crossorigin></script>`);
});

test('.buildScriptElement() - crossorigin boolean false', () => {
    const obj = new AssetJs({
        crossorigin: false,
        value: '/bar',
    });
    const result = utils.buildScriptElement(obj);
    expect(result).toEqual(`<script src="/bar"></script>`);
});

test('.buildScriptAttributes() - basic', () => {
    const obj = new AssetJs({ value: '/bar' });
    expect(utils.buildScriptAttributes(obj)).toEqual([ 
        { key: 'src', value: '/bar' }
    ]);
});

test('.buildScriptAttributes() - advanced', () => {
    const obj = new AssetJs({
        value: '/bar',
        crossorigin: true,
        async: true,
        integrity: 'fake',
        defer: true,
        type: 'module',
    });
    expect(utils.buildScriptAttributes(obj)).toEqual([ 
        { key: 'src', value: '/bar' },
        { key: 'type', value: 'module' },
        { key: 'crossorigin' },
        { key: 'integrity', value: 'fake' },
        { key: 'async' },
        { key: 'defer' },
    ]);
});

test('.buildLinkAttributes() - basic', () => {
    const obj = new AssetCss({ value: '/bar' });
    expect(utils.buildLinkAttributes(obj)).toEqual([ 
        { key: 'href', value: '/bar' },
        { key: 'type', value: 'text/css' },
        { key: 'rel', value: 'stylesheet' },
    ]);
});

test('.buildLinkAttributes() - advanced', () => {
    const obj = new AssetCss({
        value: '/bar',
        disabled: true,
        hreflang: 'test1',
        title: 'test2',
        media: 'test3',
        as: 'test4',
        type: 'test5',
        rel: 'test6',
    });
    expect(utils.buildLinkAttributes(obj)).toEqual([
        { key: 'href', value: '/bar' },
        { key: 'disabled', value: undefined },
        { key: 'hreflang', value: 'test1' },
        { key: 'title', value: 'test2' },
        { key: 'media', value: 'test3' },
        { key: 'as', value: 'test4' },
        { key: 'type', value: 'test5' },
        { key: 'rel', value: 'test6' },
    ]);
});

test('.buildReactScriptAttributes()', () => {
    const obj = new AssetJs({
        value: '/bar',
        crossorigin: true,
        async: true,
        defer: true,
        nomodule: true,
    });
    expect(utils.buildReactScriptAttributes(obj)).toEqual({ 
        src: '/bar',
        crossOrigin: '',
        noModule: true,
        async: true,
        defer: true,
    });
});

test('.buildReactLinkAttributes()', () => {
    const obj = new AssetCss({
        value: '/bar',
        crossorigin: true,
        disabled: true,
    });
    expect(utils.buildReactLinkAttributes(obj)).toEqual({ 
        href: '/bar',
        crossOrigin: '',
        rel: 'stylesheet',
        disabled: true,
        type: 'text/css',
    });
});
