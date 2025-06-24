import tap from 'tap';
import PodiumClientResponse from '@podium/client/lib/response.js';
import { DangerouslyIncludeUnescapedHTML, html } from '../lib/html.js';

tap.test('works with strings', (t) => {
    const result = html`Hello, ${'World'}!`;
    t.equal(result.content, 'Hello, World!');
    t.end();
});

tap.test('works with value as last thingy', (t) => {
    const result = html`Hello, ${'World'}`;
    t.equal(result.content, 'Hello, World');
    t.end();
});

tap.test('sanitizes bad stuff™', (t) => {
    const bad = '<script>alert(1);</script>';
    const result = html`Hello, ${bad}`;
    t.equal(result.content, 'Hello, &lt;script&gt;alert(1);&lt;/script&gt;');
    t.end();
});

tap.test("passes on podlet's contents as-is", (t) => {
    const res = new PodiumClientResponse({
        content: '<p>Hello, Podlet!</p>',
    });
    const result = html`<p>Hello, Layout!</p>
        ${res}`;
    t.equal(
        result.content,
        `<p>Hello, Layout!</p>
        <p>Hello, Podlet!</p>`,
    );
    t.end();
});

tap.test('passes on DangerouslyIncludeUnescapedHTML contents as-is', (t) => {
    const res = new DangerouslyIncludeUnescapedHTML({
        __content: '<p>Hello, Podlet!</p>',
    });
    const result = html`<p>Hello, Layout!</p>
        ${res}`;
    t.match(result.content, /<p>Hello, Layout!<\/p>\s*<p>Hello, Podlet!<\/p>/);
    t.end();
});
