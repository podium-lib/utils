import tap from 'tap';
import { Hints } from '../lib/hints.js';

tap.test('Hints() - allHintsReceived property - should be true', (t) => {
    const hints = new Hints();
    hints.addExpectedHint('foo');
    hints.addExpectedHint('bar');
    hints.addReceivedHint('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    hints.addReceivedHint('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    t.equal(hints.allHintsReceived, true);
    t.end();
});

tap.test('Hints() - complete event - should fire', (t) => {
    t.plan(6);
    const hints = new Hints();
    hints.on('complete', ({ js, css }) => {
        t.equal(js.length, 2);
        t.equal(css.length, 2);
        t.equal(js[0].value, 'foo.js');
        t.equal(css[0].value, 'foo.css');
        t.equal(js[1].value, 'foo.js');
        t.equal(css[1].value, 'foo.css');
        t.end();
    });
    hints.addExpectedHint('foo');
    hints.addExpectedHint('bar');
    hints.addReceivedHint('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    hints.addReceivedHint('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
});
