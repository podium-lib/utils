

/* eslint no-unused-vars: "off", import/no-extraneous-dependencies: "off", no-console: "off" */

const benchmark = require('benchmark');
const HttpIncoming = require('../lib/http-incoming');

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
});

add('new HttpIncoming() - With params', () => {
    const incoming = new HttpIncoming(REQ, RES, PARAMS);
});

suite
    .on('cycle', (ev) => {
        console.log(ev.target.toString());
        if (ev.target.error) {
            console.error(ev.target.error);
        }
    })
    .run();

