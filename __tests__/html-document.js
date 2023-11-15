'use strict';

const HttpIncoming = require('../lib/http-incoming');
const document = require('../lib/html-document');

const SIMPLE_REQ = {
    headers: {},
};

const SIMPLE_RES = {
    locals: {},
};

/**
 * .document()
 */

test('.document() - no arguments given - should render template', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    const result = document(incoming);
    expect(result).toMatchSnapshot();
});

test('.document() - arguments given - should render template using values given', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.css = [{ value: 'http://somecssurl.com' }];
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
    expect(result).toMatchSnapshot();
});

test('.document() - arguments given - handles v4 js and css syntax', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.css = [
        { value: 'http://somecssurl1.com', type: 'text/css' },
        { value: 'http://somecssurl2.com', type: 'text/css' },
        { value: 'http://somecssurl3.com', type: 'text/css' },
    ];
    incoming.js = [
        { value: 'http://somejsurl1.com', type: 'default' },
        { value: 'http://somejsurl2.com', type: 'default' },
        { value: 'http://somejsurl3.com', type: 'default' },
    ];

    const result = document(incoming);
    expect(result).toMatchSnapshot();
});

test('.document() - js "type" is "esm" - should set type to module on script tags', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.css = [
        { value: 'http://somecssurl1.com', type: 'text/css' },
        { value: 'http://somecssurl2.com', type: 'text/css' },
        { value: 'http://somecssurl3.com', type: 'text/css' },
    ];
    incoming.js = [
        { value: 'http://somejsurl1.com', type: 'esm' },
        { value: 'http://somejsurl2.com', type: 'esm' },
        { value: 'http://somejsurl3.com', type: 'esm' },
    ];

    const result = document(incoming);
    expect(result).toMatchSnapshot();
});

test('.document() - js "type" is "esm" - should set type to module on script tags', () => {
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.css = [{ value: 'http://somecssurl1.com', type: 'text/css' }];
    incoming.js = [
        { value: 'http://somejsurl1.com/lazy', type: 'module', strategy: 'lazy' },
        { value: 'http://somejsurl2.com/before', type: 'module', strategy: 'beforeInteractive' },
        { value: 'http://somejsurl3.com/after', type: 'module', strategy: 'afterInteractive' },
    ];

    const result = document(incoming);
    expect(result).toMatchSnapshot();
});
