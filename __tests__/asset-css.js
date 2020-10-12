'use strict';

const Css = require('../lib/asset-css');

test('Css() - object tag - should be PodiumAssetCss', () => {
    const obj = new Css({ value: '/foo' });
    expect(Object.prototype.toString.call(obj)).toEqual(
        '[object PodiumAssetCss]',
    );
});

test('Css() - no value given to "value" argument - should throw', () => {
    expect.hasAssertions();
    expect(() => {
        const obj = new Css(); // eslint-disable-line no-unused-vars
    }).toThrowError(
        'Value for argument variable "value", "undefined", is not valid',
    );
});

test('Css() - no arguments given - should construct object with default values', () => {
    const obj = new Css({ value: '/foo' });
    expect(obj.crossorigin).toEqual(undefined);
    expect(obj.disabled).toEqual(false);
    expect(obj.hreflang).toEqual('');
    expect(obj.value).toEqual('/foo');
    expect(obj.title).toEqual('');
    expect(obj.media).toEqual('');
    expect(obj.type).toEqual('text/css');
    expect(obj.href).toEqual('/foo');
    expect(obj.rel).toEqual('stylesheet');
    expect(obj.as).toEqual('');
});

test('Css() - no arguments given - should construct JSON with default values', () => {
    const obj = new Css({ value: '/foo' });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
});

test('Css() - pathname is given - prefix is unset - should NOT append pathname to "value"', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    expect(obj.value).toEqual('/foo');
    expect(obj.href).toEqual('/foo');
});

test('Css() - pathname is given - prefix is false - should NOT append pathname to "value"', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    expect(obj.value).toEqual('/foo');
    expect(obj.href).toEqual('/foo');
});

test('Css() - pathname is given - prefix is true - should append pathname to "value"', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    expect(obj.value).toEqual('/bar/foo');
    expect(obj.href).toEqual('/bar/foo');
});

test('Css() - pathname is given - prefix is unset - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
});

test('Css() - pathname is given - prefix is false - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
});

test('Css() - pathname is given - prefix is true - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });
});

test('Css() - pathname is given - prefix is unset - should NOT append pathname to "href" for toHTML()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar' });
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
});

test('Css() - pathname is given - prefix is false - should NOT append pathname to "href" for toHTML()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: false });
    expect(obj.value).toEqual('/foo');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" type="text/css" rel="stylesheet">',
    );
});

test('Css() - pathname is given - prefix is true - should append pathname to "href" for toHTML()', () => {
    const obj = new Css({ value: '/foo', pathname: '/bar', prefix: true });
    expect(obj.toHTML()).toEqual(
        '<link href="/bar/foo" type="text/css" rel="stylesheet">',
    );
});

test('Css() - value if absoulte - pathname is given - prefix is true - should NOT append pathname to "value"', () => {
    const obj = new Css({
        value: 'http://somewhere.else.com/foo',
        pathname: '/bar',
        prefix: true,
    });
    expect(obj.value).toEqual('http://somewhere.else.com/foo');
    expect(obj.href).toEqual('http://somewhere.else.com/foo');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: 'http://somewhere.else.com/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    expect(obj.toHTML()).toEqual(
        '<link href="http://somewhere.else.com/foo" type="text/css" rel="stylesheet">',
    );
});

test('Css() - set "crossorigin" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.crossorigin = 'bar';

    expect(obj.crossorigin).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" crossorigin="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        crossorigin: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.crossorigin).toEqual('bar');
});

test('Css() - set "disabled" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.disabled = true;

    expect(obj.disabled).toEqual(true);
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" disabled type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        disabled: true,
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.disabled).toEqual(true);
});

test('Css() - set "hreflang" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.hreflang = 'bar';

    expect(obj.hreflang).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" hreflang="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        hreflang: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.hreflang).toEqual('bar');
});

test('Css() - set "title" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.title = 'bar';

    expect(obj.title).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" title="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        title: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.title).toEqual('bar');
});

test('Css() - set "media" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.media = 'bar';

    expect(obj.media).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" media="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        media: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.media).toEqual('bar');
});

test('Css() - set "type" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.type = 'bar';

    expect(obj.type).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" type="bar" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'bar',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.type).toEqual('bar');
});

test('Css() - set "rel" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.rel = 'bar';

    expect(obj.rel).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" type="text/css" rel="bar">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'text/css',
        rel: 'bar',
    });

    const repl = new Css(json);
    expect(repl.rel).toEqual('bar');
});

test('Css() - set "as" - should construct object as expected', () => {
    const obj = new Css({
        value: '/foo',
    });

    obj.as = 'bar';

    expect(obj.as).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<link href="/foo" as="bar" type="text/css" rel="stylesheet">',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        as: 'bar',
        value: '/foo',
        type: 'text/css',
        rel: 'stylesheet',
    });

    const repl = new Css(json);
    expect(repl.as).toEqual('bar');
});

test('Css() - set "value" - should throw', () => {
    expect.hasAssertions();
    const obj = new Css({
        value: '/foo',
    });
    expect(() => {
        obj.value = '/bar';
    }).toThrowError('Cannot set read-only property.');
});

test('Css() - set "href" - should throw', () => {
    expect.hasAssertions();
    const obj = new Css({
        value: '/foo',
    });
    expect(() => {
        obj.href = '/bar';
    }).toThrowError('Cannot set read-only property.');
});

test('Css() - .toReactAttrs()', () => {
    const obj = new Css({ value: '/foo' });
    expect(obj.toReactAttrs()).toEqual({
        href: '/foo',
        rel: 'stylesheet',
        type: 'text/css',
    });
});