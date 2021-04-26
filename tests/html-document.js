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
    t.matchSnapshot(result, 'should render template using values given');
    t.end();
});

tap.test('.document() - arguments given - handles v4 js and css syntax', (t) => {
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
    t.matchSnapshot(result, 'should render template using values given');
    t.end();
});

tap.test('.document() - js "type" is "esm"', (t) => {
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
    t.matchSnapshot(result, 'should set type to module on script tags');
    t.end();
});
