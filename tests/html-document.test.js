import tap from 'tap';
import HttpIncoming from '../lib/http-incoming.js';
import { document } from '../lib/html-document.js';

const SIMPLE_REQ = {
    headers: {},
};

const SIMPLE_RES = {
    locals: {},
};

tap.test('.document() - no arguments given', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    const result = document(incoming);
    t.matchSnapshot(result, 'should render template');
    t.end();
});

tap.test('.document() - arguments given', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    // @ts-expect-error Limited test
    incoming.css = [{ value: 'http://somecssurl.com' }];
    // @ts-expect-error Limited test
    incoming.js = [{ value: 'http://somejsurl.com' }];
    incoming.context = {
        locale: 'en-NZ',
    };
    incoming.view = {
        encoding: 'utf-pretend-encoding',
        title: 'this goes in the title tag',
    };

    const head = 'this goes in the head section';
    const body = 'this goes in the body section';

    const result = document(incoming, body, head);
    t.matchSnapshot(result, 'should render template using values given');
    t.end();
});

tap.test(
    '.document() - arguments given - handles v4 js and css syntax',
    (t) => {
        const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
        incoming.css = [
            // @ts-expect-error Limited test
            { value: 'http://somecssurl1.com', type: 'text/css' },
            // @ts-expect-error
            { value: 'http://somecssurl2.com', type: 'text/css' },
            // @ts-expect-error
            { value: 'http://somecssurl3.com', type: 'text/css' },
        ];
        incoming.js = [
            // @ts-expect-error
            { value: 'http://somejsurl1.com', type: 'default' },
            // @ts-expect-error
            { value: 'http://somejsurl2.com', type: 'default' },
            // @ts-expect-error
            { value: 'http://somejsurl3.com', type: 'default' },
        ];

        const result = document(incoming);
        t.matchSnapshot(result, 'should render template using values given');
        t.end();
    },
);

tap.test('.document() - js "type" is "esm"', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.css = [
        // @ts-expect-error Limited test
        { value: 'http://somecssurl1.com', type: 'text/css' },
        // @ts-expect-error
        { value: 'http://somecssurl2.com', type: 'text/css' },
        // @ts-expect-error
        { value: 'http://somecssurl3.com', type: 'text/css' },
    ];
    incoming.js = [
        // @ts-expect-error
        { value: 'http://somejsurl1.com', type: 'esm' },
        // @ts-expect-error
        { value: 'http://somejsurl2.com', type: 'esm' },
        // @ts-expect-error
        { value: 'http://somejsurl3.com', type: 'esm' },
    ];

    const result = document(incoming);
    t.matchSnapshot(result, 'should set type to module on script tags');
    t.end();
});

tap.test(
    '.document() - "type" is "module", "strategy" is set - should place assets based on strategy',
    (t) => {
        const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
        // @ts-expect-error Limited test
        incoming.css = [{ value: 'http://somecssurl1.com', type: 'text/css' }];
        incoming.js = [
            // @ts-expect-error Limited test
            {
                value: 'http://somejsurl1.com/lazy',
                type: 'module',
                strategy: 'lazy',
            },
            // @ts-expect-error Limited test
            {
                value: 'http://somejsurl2.com/before',
                type: 'module',
                strategy: 'beforeInteractive',
            },
            // @ts-expect-error Limited test
            {
                value: 'http://somejsurl3.com/after',
                type: 'module',
                strategy: 'afterInteractive',
            },
        ];

        const result = document(incoming);
        t.matchSnapshot(result);
        t.end();
    },
);

tap.test('.document() - lang tag priority - params has priority', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES, { locale: 'sv' });
    const result = document(incoming, '');
    t.match(result, 'lang="sv"', 'should render lang tag sv');
    t.end();
});

tap.test('.document() - lang tag priority - context has priority', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES, { locale: 'sv' });
    incoming.context = { locale: 'en-NZ' };
    const result = document(incoming, '');
    t.match(result, 'lang="en-NZ"', 'should render lang tag en-NZ');
    t.end();
});

tap.test('.document() - lang tag priority - view has priority', (t) => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES, { locale: 'sv' });
    incoming.context = { locale: 'en-NZ' };
    incoming.view = { locale: 'nb' };
    const result = document(incoming, '');
    t.match(result, 'lang="nb"', 'should render lang tag nb');
    t.end();
});
