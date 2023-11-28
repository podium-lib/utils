import tap from 'tap';
import * as schema from '@podium/schemas';
import AssetJs from '../lib/asset-js.js';

tap.test('Js() - object tag - should be PodiumAssetJs', (t) => {
    const obj = new AssetJs({ value: '/foo' });
    t.equal(Object.prototype.toString.call(obj), 
        '[object PodiumAssetJs]',
    );
    t.end();
}); 

tap.test('Js() - no value given to "value" argument', (t) => {
    t.plan(1);
    t.throws(() => {
        const obj = new AssetJs(); // eslint-disable-line no-unused-vars
    }, /Value for argument variable "value", "undefined", is not valid/, 'Should throw');
    t.end();
}); 

tap.test('Js() - no arguments given - should construct object with default values', (t) => {
    const obj = new AssetJs({ value: '/foo' });
    t.equal(obj.referrerpolicy, '');
    t.equal(obj.crossorigin, undefined);
    t.equal(obj.integrity, '');
    t.notOk(obj.nomodule);
    t.notOk(obj.async);
    t.notOk(obj.defer);
    t.equal(obj.value, '/foo');
    t.equal(obj.type, 'default');
    t.equal(obj.src, '/foo');
    t.same(obj.data, []);
    t.end();
}); 

tap.test('Js() - no arguments given - should construct JSON with default values', (t) => {
    const obj = new AssetJs({ value: '/foo' });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'default',
    });
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is unset - should NOT append pathname to "value"', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar' });
    t.equal(obj.value, '/foo');
    t.equal(obj.src, '/foo');
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is false - should NOT append pathname to "value"', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: false });
    t.equal(obj.value, '/foo');
    t.equal(obj.src, '/foo');
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is true - should append pathname to "value"', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: true });
    t.equal(obj.value, '/bar/foo');
    t.equal(obj.src, '/bar/foo');
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is unset - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar' });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'default',
    });
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is false - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: false });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'default',
    });
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is true - should NOT append pathname to "value" for toJSON()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: true });
    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'default',
    });
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is unset - should NOT append pathname to "src" for toHTML()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar' });
    t.equal(obj.toHTML(), '<script src="/foo"></script>');
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is false - should NOT append pathname to "src" for toHTML()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: false });
    t.equal(obj.value, '/foo');
    t.equal(obj.toHTML(), '<script src="/foo"></script>');
    t.end();
}); 

tap.test('Js() - pathname is given - prefix is true - should append pathname to "src" for toHTML()', (t) => {
    const obj = new AssetJs({ value: '/foo', pathname: '/bar', prefix: true });
    t.equal(obj.toHTML(), '<script src="/bar/foo"></script>');
    t.end();
}); 

tap.test('Js() - value if absoulte - pathname is given - prefix is true - should NOT append pathname to "value"', (t) => {
    const obj = new AssetJs({
        value: 'http://somewhere.else.com/foo',
        pathname: '/bar',
        prefix: true,
    });
    t.equal(obj.value, 'http://somewhere.else.com/foo');
    t.equal(obj.src, 'http://somewhere.else.com/foo');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: 'http://somewhere.else.com/foo',
        type: 'default',
    });

    t.equal(obj.toHTML(), 
        '<script src="http://somewhere.else.com/foo"></script>',
    );
    t.end();
}); 

tap.test('Js() - set "referrerpolicy" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.referrerpolicy = 'bar';

    t.equal(obj.referrerpolicy, 'bar');
    t.equal(obj.toHTML(), 
        '<script src="/foo" referrerpolicy="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        referrerpolicy: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.equal(repl.referrerpolicy, 'bar');
    t.end();
}); 

tap.test('Js() - set "crossorigin" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.crossorigin = 'bar';

    t.equal(obj.crossorigin, 'bar');
    t.equal(obj.toHTML(), 
        '<script src="/foo" crossorigin="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        crossorigin: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.equal(repl.crossorigin, 'bar');
    t.end();
}); 

tap.test('Js() - set "integrity" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.integrity = 'bar';

    t.equal(obj.integrity, 'bar');
    t.equal(obj.toHTML(), 
        '<script src="/foo" integrity="bar"></script>',
    );

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        integrity: 'bar',
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.equal(repl.integrity, 'bar');
    t.end();
}); 

tap.test('Js() - set "nomodule" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.nomodule = true;

    t.ok(obj.nomodule);
    t.equal(obj.toHTML(), '<script src="/foo" nomodule></script>');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        nomodule: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.ok(repl.nomodule);
    t.end();
}); 

tap.test('Js() - set "async" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.async = true;

    t.ok(obj.async);
    t.equal(obj.toHTML(), '<script src="/foo" async></script>');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        async: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.ok(repl.async);
    t.end();
}); 

tap.test('Js() - set "defer" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.defer = true;

    t.ok(obj.defer);
    t.equal(obj.toHTML(), '<script src="/foo" defer></script>');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        defer: true,
        value: '/foo',
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.ok(repl.defer);
    t.end();
}); 

tap.test('Js() - set "type" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.type = 'esm';

    t.equal(obj.type, 'esm');
    t.equal(obj.toHTML(), '<script src="/foo" type="module"></script>');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        type: 'esm',
    });

    const repl = new AssetJs(json);
    t.equal(repl.type, 'esm');
    t.end();
}); 

tap.test('Js() - set "data" - should construct object as t.equaled', (t) => {
    const obj = new AssetJs({
        value: '/foo',
    });

    obj.data = [{ 
        key: 'foo',
        value: 'bar'     
    }];

    t.same(obj.data, [{ 
        key: 'foo',
        value: 'bar'     
    }]);
    t.equal(obj.toHTML(), '<script src="/foo" data-foo="bar"></script>');

    const json = JSON.parse(JSON.stringify(obj));
    t.same(json, {
        value: '/foo',
        data: [{ 
            key: 'foo',
            value: 'bar'     
        }],
        type: 'default',
    });

    const repl = new AssetJs(json);
    t.same(repl.data, [{ 
        key: 'foo',
        value: 'bar'     
    }]);
    t.end();
}); 

tap.test('Js() - set "value"', (t) => {
    t.plan(1);
    const obj = new AssetJs({
        value: '/foo',
    });
    t.throws(() => {
        obj.value = '/bar';
    }, /Cannot set read-only property./, 'Should throw');
    t.end();
}); 

tap.test('Js() - set "src"', (t) => {
    t.plan(1);
    const obj = new AssetJs({
        value: '/foo',
    });
    t.throws(() => {
        obj.src = '/bar';
    }, /Cannot set read-only property./, 'Should throw');
    t.end();
}); 

tap.test('Js() - validate object against schema - should validate', (t) => {
    const obj = new AssetJs({ value: '/foo' });
    t.notOk(schema.js([obj]).error);
    t.end();
}); 
