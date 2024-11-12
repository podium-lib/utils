import tap from 'tap';
import { Assets } from '../lib/assets.js';

tap.test('Hints() - allHintsReceived property - should be true', (t) => {
    const assets = new Assets();
    assets.addExpectedAsset('foo');
    assets.addExpectedAsset('bar');
    assets.addReceivedAsset('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    assets.addReceivedAsset('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    t.equal(assets.allAssetsReceived, true);
    t.end();
});

tap.test('Hints() - received event - should fire', (t) => {
    t.plan(6);
    const assets = new Assets();
    assets.on('received', ({ js, css }) => {
        t.equal(js.length, 2);
        t.equal(css.length, 2);
        t.equal(js[0].value, 'foo.js');
        t.equal(css[0].value, 'foo.css');
        t.equal(js[1].value, 'foo.js');
        t.equal(css[1].value, 'foo.css');
        t.end();
    });
    assets.addExpectedAsset('foo');
    assets.addExpectedAsset('bar');
    assets.addReceivedAsset('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    assets.addReceivedAsset('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
});
