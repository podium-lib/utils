'use strict';

const { validate } = require('@podium/schemas');
const tap = require('tap');
const Css = require('../lib/asset-css');

tap.test('Css() - object tag - should be PodiumAssetCss', (t) => {
    const obj = new Css({ value: '/foo' });
    t.equal(Object.prototype.toString.call(obj), '[object PodiumAssetCss]');
    t.end();
});

tap.test('Css() - no value given to "value" argument', (t) => {
    t.plan(1);
    t.throws(() => {
        const obj = new Css(); // eslint-disable-line no-unused-vars
    }, /Value for argument variable "value", "undefined", is not valid/, 'Should throw');
    t.end();
});

tap.test('Css() - no arguments given - should construct object with default values', (t) => {
    const obj = new Css({ value: '/foo' });
    t.equal(obj.crossorigin, undefined);
    t.false(obj.disabled);
    t.equal(obj.hreflang, '');
    t.equal(obj.value, '/foo');
    t.equal(obj.title, '');
    t.equal(obj.media, '');
    t.equal(obj.type, 'text/css');
    t.equal(obj.href, '/foo');
    t.equal(obj.rel, 'stylesheet');
    t.equal(obj.as, '');
    t.end();
});

tap.test('Css() - no arguments given - should construct JSON with default values', (t) => {
    const obj = new Css({ value: '/foo' });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
    t.end();
});

tap.test('Css() - pathname is given - prefix is unset - should NOT append pathname to "value"', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    t.equal(obj.value, '/foo');
    t.equal(obj.href, '/foo');
    t.end();
});

tap.test('Css() - pathname is given - prefix is false - should NOT append pathname to "value"', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    t.equal(obj.value, '/foo');
    t.equal(obj.href, '/foo');
    t.end();
});

tap.test('Css() - pathname is given - prefix is true - should append pathname to "value"', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    t.equal(obj.value, '/bar/foo');
    t.equal(obj.href, '/bar/foo');
    t.end();
});

tap.test('Css() - pathname is given - prefix is unset - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
    t.end();
});

tap.test('Css() - pathname is given - prefix is false - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
    t.end();
});

tap.test('Css() - pathname is given - prefix is true - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
    t.end();
});

tap.test('Css() - pathname is given - prefix is unset - should NOT append pathname to "href" for toHTML()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    t.equal(obj.toHTML(), '<link href="/foo" type="text/css" rel="stylesheet">');
    t.end();
});

tap.test('Css() - pathname is given - prefix is false - should NOT append pathname to "href" for toHTML()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    t.equal(obj.value, '/foo');
    t.equal(obj.toHTML(), '<link href="/foo" type="text/css" rel="stylesheet">');
    t.end();
});

tap.test('Css() - pathname is given - prefix is true - should append pathname to "href" for toHTML()', (t) => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    t.equal(obj.toHTML(), '<link href="/bar/foo" type="text/css" rel="stylesheet">');
    t.end();
});

tap.test('Css() - value if absoulte - pathname is given - prefix is true - should NOT append pathname to "value"', (t) => {
    const obj = new Css({
        value: 'http://somewhere.else.com/foo',
        pathname: '/bar',
        prefix: true,
    });
    t.equal(obj.value, 'http://somewhere.else.com/foo');
    t.equal(obj.href, 'http://somewhere.else.com/foo');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: 'http://somewhere.else.com/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    t.equal(obj.toHTML(), '<link href="http://somewhere.else.com/foo" type="text/css" rel="stylesheet">');
    t.end();
});

tap.test('Css() - set "crossorigin" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.crossorigin = 'bar';

    t.equal(obj.crossorigin, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" crossorigin="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        crossorigin: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.crossorigin, 'bar');
    t.end();
});

tap.test('Css() - set "disabled" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.disabled = true;

    t.true(obj.disabled);
    t.equal(obj.toHTML(), 
        '<link href="/foo" disabled type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        disabled: true,
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.true(repl.disabled);
    t.end();
});

tap.test('Css() - set "hreflang" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.hreflang = 'bar';

    t.equal(obj.hreflang, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" hreflang="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        hreflang: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.hreflang, 'bar');
    t.end();
});

tap.test('Css() - set "title" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.title = 'bar';

    t.equal(obj.title, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" title="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        title: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.title, 'bar');
    t.end();
});

tap.test('Css() - set "media" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.media = 'bar';

    t.equal(obj.media, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" media="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        media: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.media, 'bar');
    t.end();
});

tap.test('Css() - set "type" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.type = 'bar';

    t.equal(obj.type, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" type="bar" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'bar',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.type, 'bar');
    t.end();
});

tap.test('Css() - set "rel" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.rel = 'bar';

    t.equal(obj.rel, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" type="text/css" rel="bar">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'text/css',
        rel: 'bar',
    });

    const repl = new Css(json);
    t.equal(repl.rel, 'bar');
    t.end();
});

tap.test('Css() - set "as" - should construct object as expected', (t) => {
    const obj = new Css({
        value: '/foo',
    });

    obj.as = 'bar';

    t.equal(obj.as, 'bar');
    t.equal(obj.toHTML(), 
        '<link href="/foo" as="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        as: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    t.equal(repl.as, 'bar');
    t.end();
});

tap.test('Css() - set "value"', (t) => {
    t.plan(1);
    const obj = new Css({
        value: '/foo',
    });
    t.throws(() => {
        obj.value = '/bar';
    }, /Cannot set read-only property./, 'Should throw');
    t.end();
});

tap.test('Css() - set "href" - should throw', (t) => {
    t.plan(1);
    const obj = new Css({
        value: '/foo',
    });
    t.throws(() => {
        obj.href = '/bar';
    }, /Cannot set read-only property./, 'Should throw');
    t.end();
});

tap.test('Css() - validate object against schema - should validate', (t) => {
    const obj = new Css({ value: '/foo' });
    t.false(validate.css([obj]).error);
    t.end();
});
