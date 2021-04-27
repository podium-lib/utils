import tap from 'tap';
import AssetCss from '../lib/asset-css.js';
import AssetJs from '../lib/asset-js.js'
import * as utils from '../lib/html-utils.js'


/**
 * .buildLinkElement()
 */

tap.test('.buildLinkElement() - "value" property has a value - should appended "href" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "crossorigin" property has a value - should appended "crossorigin" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        crossorigin: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" crossorigin="bar" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "disabled" property is "true" - should appended "disabled" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        disabled: true,
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" disabled type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "hreflang" property has a value - should appended "hreflang" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        hreflang: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" hreflang="bar" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "title" property has a value - should appended "title" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        title: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" title="bar" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "media" property has a value - should appended "media" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        media: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" media="bar" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "as" property has a value - should appended "as" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        as: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        '<link href="/foo" as="bar" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - "type" property has a value - should appended "type" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        type: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, '<link href="/foo" type="bar" rel="stylesheet">');
    t.end();
});

tap.test('.buildLinkElement() - "rel" property has a value - should appended "rel" attribute to element', (t) => {
    const obj = new AssetCss({
        value: '/foo',
        rel: 'bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, '<link href="/foo" type="text/css" rel="bar">');
    t.end();
});

tap.test('.buildLinkElement() - properties are "undefined" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, 
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
    t.end();
});

tap.test('.buildLinkElement() - properties are "null" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<link href="/foo">');
    t.end();
});

tap.test('.buildLinkElement() - properties are "false" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<link href="/foo">');
    t.end();
});

tap.test('.buildLinkElement() - properties are empty string - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<link href="/foo" crossorigin="">');
    t.end();
});

tap.test('.buildLinkElement() - crossorigin boolean true', (t) => {
    const obj = new AssetCss({
        crossorigin: true,
        value: '/bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        `<link href="/bar" crossorigin type="text/css" rel="stylesheet">`,
    );
    t.end();
});

tap.test('.buildLinkElement() - crossorigin boolean false', (t) => {
    const obj = new AssetCss({
        crossorigin: false,
        value: '/bar',
    });
    const result = utils.buildLinkElement(obj);
    t.equal(result, 
        `<link href="/bar" type="text/css" rel="stylesheet">`,
    );
    t.end();
});

/**
 * .buildScriptElement()
 */

tap.test('.buildScriptElement() - "value" property has a value - should appended "src" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "type" property has "module" as value - should appended "type" attribute with "module" as value to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'module',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" type="module"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "type" property has "esm" as value - should appended "type" attribute with "module" as value to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'esm',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" type="module"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "type" property has "cjs" as value - should NOT appended a attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        type: 'cjs',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "referrerpolicy" property has a value - should appended "referrerpolicy" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        referrerpolicy: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" referrerpolicy="bar"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "crossorigin" property has a value - should appended "crossorigin" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        crossorigin: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" crossorigin="bar"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "integrity" property has a value - should appended "integrity" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        integrity: 'bar',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" integrity="bar"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "nomodule" property is "true" - should appended "nomodule" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        nomodule: true,
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" nomodule></script>');
    t.end();
});

tap.test('.buildScriptElement() - "async" property is "true" - should appended "async" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        async: true,
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" async></script>');
    t.end();
});

tap.test('.buildScriptElement() - "data" property has a value - should appended "data" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        data: [{ 
            key: 'foo',
            value: 'bar'     
        }],
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" data-foo="bar"></script>');
    t.end();
});

tap.test('.buildScriptElement() - "defer" property is "true" - should appended "defer" attribute to element', (t) => {
    const obj = new AssetJs({
        value: '/foo',
        defer: true,
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, '<script src="/foo" defer></script>');
    t.end();
});

tap.test('.buildScriptElement() - properties are "undefined" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - properties are "null" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - properties are "false" - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - properties are empty string - should NOT appended attributes to element', (t) => {
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
    t.equal(result, '<script src="/foo"></script>');
    t.end();
});

tap.test('.buildScriptElement() - crossorigin empty string', (t) => {
    const obj = new AssetJs({
        crossorigin: '',
        value: '/foo',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, `<script src="/foo" crossorigin=""></script>`);
    t.end();
});

tap.test('.buildScriptElement() - crossorigin boolean true', (t) => {
    const obj = new AssetJs({
        crossorigin: true,
        value: '/bar',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, `<script src="/bar" crossorigin></script>`);
    t.end();
});

tap.test('.buildScriptElement() - crossorigin boolean false', (t) => {
    const obj = new AssetJs({
        crossorigin: false,
        value: '/bar',
    });
    const result = utils.buildScriptElement(obj);
    t.equal(result, `<script src="/bar"></script>`);
    t.end();
});

tap.test('.buildScriptAttributes() - basic', (t) => {
    const obj = new AssetJs({ value: '/bar' });
    t.same(utils.buildScriptAttributes(obj), [
        { key: 'src', value: '/bar' }
    ]);
    t.end();
});

tap.test('.buildScriptAttributes() - advanced', (t) => {
    const obj = new AssetJs({
        value: '/bar',
        crossorigin: true,
        async: true,
        integrity: 'fake',
        defer: true,
        type: 'module',
    });
    t.same(utils.buildScriptAttributes(obj), [ 
        { key: 'src', value: '/bar' },
        { key: 'type', value: 'module' },
        { key: 'crossorigin' },
        { key: 'integrity', value: 'fake' },
        { key: 'async' },
        { key: 'defer' },
    ]);
    t.end();
});

tap.test('.buildLinkAttributes() - basic', (t) => {
    const obj = new AssetCss({ value: '/bar' });
    t.same(utils.buildLinkAttributes(obj), [ 
        { key: 'href', value: '/bar' },
        { key: 'type', value: 'text/css' },
        { key: 'rel', value: 'stylesheet' },
    ]);
    t.end();
});


tap.test('.buildLinkAttributes() - advanced', (t) => {
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
    t.same(utils.buildLinkAttributes(obj), [
        { key: 'href', value: '/bar' },
        { key: 'disabled' },
        { key: 'hreflang', value: 'test1' },
        { key: 'title', value: 'test2' },
        { key: 'media', value: 'test3' },
        { key: 'as', value: 'test4' },
        { key: 'type', value: 'test5' },
        { key: 'rel', value: 'test6' },
    ]);
    t.end();
});

tap.test('.buildReactScriptAttributes()', (t) => {
    const obj = new AssetJs({
        value: '/bar',
        crossorigin: true,
        async: true,
        defer: true,
        nomodule: true,
    });
    t.same(utils.buildReactScriptAttributes(obj), { 
        src: '/bar',
        crossOrigin: '',
        noModule: true,
        async: true,
        defer: true,
    });
    t.end();
});

tap.test('.buildReactLinkAttributes()', (t) => {
    const obj = new AssetCss({
        value: '/bar',
        crossorigin: true,
        disabled: true,
    });
    t.same(utils.buildReactLinkAttributes(obj), { 
        href: '/bar',
        crossOrigin: '',
        rel: 'stylesheet',
        disabled: true,
        type: 'text/css',
    });
    t.end();
});
