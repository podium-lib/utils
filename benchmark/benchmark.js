

/* eslint no-unused-vars: "off", import/no-extraneous-dependencies: "off", no-console: "off" */

import benchmark from 'benchmark';
import HttpIncoming from '../lib/http-incoming.js';

const suite = new benchmark.Suite();

const add = (name, fn) => {
    suite.add(name, fn);
};

/**
 * new HttpIncoming();
 */

const REQ = {
    headers: {
        host: 'localhost:3030',
    },
    protocol: 'http:',
    hostname: 'localhost',
    url: '/some/path',
};

const RES = {
    locals: {},
};

const PARAMS = {
    foo: 'bar',
};

add('new HttpIncoming() - No params', () => {
    const incoming = new HttpIncoming(REQ, RES);
    const {url} = incoming;
});

add('new HttpIncoming() - With params', () => {
    const incoming = new HttpIncoming(REQ, RES, PARAMS);
    const {url} = incoming;
});

suite
    .on('cycle', (ev) => {
        console.log(ev.target.toString());
        if (ev.target.error) {
            console.error(ev.target.error);
        }
    })
    .run();

