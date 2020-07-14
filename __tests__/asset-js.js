'use strict';

const { validate } = require('@podium/schemas');
const Js = require('../lib/asset-js');

test('Js() - object tag - should be PodiumAssetJs', () => {
    const obj = new Js({ value: '/foo' });
    expect(Object.prototype.toString.call(obj)).toEqual(
        '[object PodiumAssetJs]',
    );
});

test('Js() - no value given to "value" argument - should throw', () => {
    expect.hasAssertions();
    expect(() => {
        const obj = new Js(); // eslint-disable-line no-unused-vars
    }).toThrowError(
        'Value for argument variable "value", "undefined", is not valid',
    );
});

test('Js() - no arguments given - should construct object with default values', () => {
    const obj = new Js({ value: '/foo' });
    expect(obj.referrerpolicy).toEqual('');
    expect(obj.crossorigin).toEqual(undefined);
    expect(obj.integrity).toEqual('');
    expect(obj.nomodule).toEqual(false);
    expect(obj.async).toEqual(false);
    expect(obj.defer).toEqual(false);
    expect(obj.value).toEqual('/foo');
    expect(obj.type).toEqual('default');
    expect(obj.src).toEqual('/foo');
    expect(obj.data).toEqual([]);
});

test('Js() - no arguments given - should construct JSON with default values', () => {
    const obj = new Js({ value: '/foo' });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'default',
    });
});

test('Js() - pathname is given - prefix is unset - should NOT append pathname to "value"', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar' });
    expect(obj.value).toEqual('/foo');
    expect(obj.src).toEqual('/foo');
});

test('Js() - pathname is given - prefix is false - should NOT append pathname to "value"', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: false });
    expect(obj.value).toEqual('/foo');
    expect(obj.src).toEqual('/foo');
});

test('Js() - pathname is given - prefix is true - should append pathname to "value"', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: true });
    expect(obj.value).toEqual('/bar/foo');
    expect(obj.src).toEqual('/bar/foo');
});

test('Js() - pathname is given - prefix is unset - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar' });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'default',
    });
});

test('Js() - pathname is given - prefix is false - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: false });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'default',
    });
});

test('Js() - pathname is given - prefix is true - should NOT append pathname to "value" for toJSON()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: true });
    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'default',
    });
});

test('Js() - pathname is given - prefix is unset - should NOT append pathname to "src" for toHTML()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar' });
    expect(obj.toHTML()).toEqual('<script src="/foo"></script>');
});

test('Js() - pathname is given - prefix is false - should NOT append pathname to "src" for toHTML()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: false });
    expect(obj.value).toEqual('/foo');
    expect(obj.toHTML()).toEqual('<script src="/foo"></script>');
});

test('Js() - pathname is given - prefix is true - should append pathname to "src" for toHTML()', () => {
    const obj = new Js({ value: '/foo', pathname: '/bar', prefix: true });
    expect(obj.toHTML()).toEqual('<script src="/bar/foo"></script>');
});

test('Js() - value if absoulte - pathname is given - prefix is true - should NOT append pathname to "value"', () => {
    const obj = new Js({
        value: 'http://somewhere.else.com/foo',
        pathname: '/bar',
        prefix: true,
    });
    expect(obj.value).toEqual('http://somewhere.else.com/foo');
    expect(obj.src).toEqual('http://somewhere.else.com/foo');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: 'http://somewhere.else.com/foo',
        type: 'default',
    });

    expect(obj.toHTML()).toEqual(
        '<script src="http://somewhere.else.com/foo"></script>',
    );
});

test('Js() - set "referrerpolicy" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.referrerpolicy = 'bar';

    expect(obj.referrerpolicy).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<script src="/foo" referrerpolicy="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        referrerpolicy: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.referrerpolicy).toEqual('bar');
});

test('Js() - set "crossorigin" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.crossorigin = 'bar';

    expect(obj.crossorigin).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<script src="/foo" crossorigin="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        crossorigin: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.crossorigin).toEqual('bar');
});

test('Js() - set "integrity" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.integrity = 'bar';

    expect(obj.integrity).toEqual('bar');
    expect(obj.toHTML()).toEqual(
        '<script src="/foo" integrity="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        integrity: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.integrity).toEqual('bar');
});

test('Js() - set "nomodule" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.nomodule = true;

    expect(obj.nomodule).toEqual(true);
    expect(obj.toHTML()).toEqual('<script src="/foo" nomodule></script>');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        nomodule: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.nomodule).toEqual(true);
});

test('Js() - set "async" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.async = true;

    expect(obj.async).toEqual(true);
    expect(obj.toHTML()).toEqual('<script src="/foo" async></script>');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        async: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.async).toEqual(true);
});

test('Js() - set "defer" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.defer = true;

    expect(obj.defer).toEqual(true);
    expect(obj.toHTML()).toEqual('<script src="/foo" defer></script>');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        defer: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.defer).toEqual(true);
});

test('Js() - set "type" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.type = 'esm';

    expect(obj.type).toEqual('esm');
    expect(obj.toHTML()).toEqual('<script src="/foo" type="module"></script>');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        type: 'esm',
    });

    const repl = new Js(json);
    expect(repl.type).toEqual('esm');
});

test('Js() - set "data" - should construct object as expected', () => {
    const obj = new Js({
        value: '/foo',
    });

    obj.data = [{ 
        key: 'foo',
        value: 'bar'     
    }];

    expect(obj.data).toEqual([{ 
        key: 'foo',
        value: 'bar'     
    }]);
    expect(obj.toHTML()).toEqual('<script src="/foo" data-foo="bar"></script>');

    const json = JSON.parse(JSON.stringify(obj));
    expect(json).toEqual({
        value: '/foo',
        data: [{ 
            key: 'foo',
            value: 'bar'     
        }],
        type: 'default',
    });

    const repl = new Js(json);
    expect(repl.data).toEqual([{ 
        key: 'foo',
        value: 'bar'     
    }]);
});

test('Js() - set "value" - should throw', () => {
    expect.hasAssertions();
    const obj = new Js({
        value: '/foo',
    });
    expect(() => {
        obj.value = '/bar';
    }).toThrowError('Cannot set read-only property.');
});

test('Js() - set "src" - should throw', () => {
    expect.hasAssertions();
    const obj = new Js({
        value: '/foo',
    });
    expect(() => {
        obj.src = '/bar';
    }).toThrowError('Cannot set read-only property.');
});

test('Js() - validate object against schema - should validate', () => {
    const obj = new Js({ value: '/foo' });
    expect(validate.js([obj]).error).toEqual(false);
});
