import tap from 'tap';
import HttpIncoming from '../lib/http-incoming.js';

const SIMPLE_REQ = {};

const ADVANCED_REQ = {
    headers: {
        host: 'localhost:3030',
    },
    hostname: 'localhost',
    url: '/some/path?foo=bar',
};

const SIMPLE_RES = {
    locals: {},
};

const SIMPLE_PARAMS = {
    foo: 'bar',
};

tap.test(
    'PodiumHttpIncoming() - object tag - should be PodiumHttpIncoming',
    (t) => {
        const incoming = new HttpIncoming(SIMPLE_REQ);
        t.equal(
            Object.prototype.toString.call(incoming),
            '[object PodiumHttpIncoming]',
        );
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming() - no arguments given - should construct object with default values',
    (t) => {
        const incoming = new HttpIncoming(SIMPLE_REQ);
        t.same(incoming.request, SIMPLE_REQ);
        t.same(incoming.response, {});
        t.same(incoming.url, {});
        t.same(incoming.params, {});
        t.notOk(incoming.proxy);
        t.same(incoming.context, {});
        t.notOk(incoming.development);
        t.equal(incoming.name, '');
        t.same(incoming.css, []);
        t.same(incoming.js, []);
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming() - "request" argument given - should store request on ".request"',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ);
        t.same(incoming.request, ADVANCED_REQ);
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming() - "request" argument given - should set parsed URL on ".url"',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ);
        t.equal(incoming.url.hostname, 'localhost');
        t.equal(incoming.url.host, 'localhost:3030');
        t.equal(incoming.url.port, '3030');
        t.equal(incoming.url.protocol, 'http:');
        t.equal(incoming.url.pathname, '/some/path');
        t.equal(incoming.url.search, '?foo=bar');
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming() - "response" argument given - should store request on ".response"',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        t.same(incoming.response, SIMPLE_RES);
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming() - "params" argument given - should store request on ".params"',
    (t) => {
        const incoming = new HttpIncoming(
            ADVANCED_REQ,
            SIMPLE_RES,
            SIMPLE_PARAMS,
        );
        t.same(incoming.params, SIMPLE_PARAMS);
        t.end();
    },
);

tap.test('PodiumHttpIncoming.request - set value', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            incoming.request = 'foo';
        },
        /Cannot set read-only property./,
        'Should throw',
    );
    t.end();
});

tap.test('PodiumHttpIncoming.response - set value', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            incoming.response = 'foo';
        },
        /Cannot set read-only property./,
        'Should throw',
    );
    t.end();
});

tap.test('PodiumHttpIncoming.params - set value', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            // @ts-ignore Testing bad input
            incoming.params = 'foo';
        },
        /Cannot set read-only property./,
        'Should throw',
    );
    t.end();
});

tap.test('PodiumHttpIncoming.url - set value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    // @ts-ignore The setter converts from a string to a URL 🙅
    incoming.url = 'http://localhost:8080/foo';
    t.equal(incoming.url.href, 'http://localhost:8080/foo');
    t.end();
});

tap.test(
    'PodiumHttpIncoming.development - set value - should set value',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        incoming.development = true;
        t.ok(incoming.development);
        t.end();
    },
);

tap.test('PodiumHttpIncoming.name - set value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.name = 'a_name';
    t.equal(incoming.name, 'a_name');
    t.end();
});

tap.test('PodiumHttpIncoming.css - set legal value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.css = ['a_css'];
    t.same(incoming.css, ['a_css']);
    t.end();
});

tap.test('PodiumHttpIncoming.css - set illegal value', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            // @ts-ignore Testing bad value
            incoming.css = 'a_css';
        },
        /Value for property ".css" must be an Array/,
        'Should throw',
    );
    t.end();
});

tap.test('PodiumHttpIncoming.js - set legal value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.js = ['a_js'];
    t.same(incoming.js, ['a_js']);
    t.end();
});

tap.test('PodiumHttpIncoming.js - set illegal value - should throw', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            // @ts-ignore Testing bad value
            incoming.js = 'a_js';
        },
        /Value for property ".js" must be an Array/,
        'Should throw',
    );
    t.end();
});

tap.test('PodiumHttpIncoming.proxy - set value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.proxy = true;
    t.ok(incoming.proxy);
    t.end();
});

tap.test('PodiumHttpIncoming.context - set value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.context = { foo: 'bar' };
    t.same(incoming.context, { foo: 'bar' });
    t.end();
});

tap.test(
    'PodiumHttpIncoming.view - no value - should return empty object',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        t.same(incoming.view, {});
        t.end();
    },
);

tap.test('PodiumHttpIncoming.view - set value - should set value', (t) => {
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    incoming.view = {
        title: 'foo',
    };
    t.same(incoming.view, {
        title: 'foo',
    });
    t.end();
});

tap.test(
    'PodiumHttpIncoming.podlets - set legal single value - should append values to .css and .js',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        incoming.podlets = {
            css: [{ value: 'foo.css' }],
            js: [{ value: 'foo.js' }],
        };
        t.same(incoming.css, [{ value: 'foo.css' }]);
        t.same(incoming.js, [{ value: 'foo.js' }]);
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming.podlets - set legal array value - should append values to .css and .js',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        incoming.podlets = [
            { css: [{ value: 'foo.css' }], js: [{ value: 'foo.js' }] },
            { css: [{ value: 'bar.css' }], js: [{ value: 'bar.js' }] },
        ];
        t.same(incoming.css, [{ value: 'foo.css' }, { value: 'bar.css' }]);
        t.same(incoming.js, [{ value: 'foo.js' }, { value: 'bar.js' }]);
        t.end();
    },
);

tap.test(
    'PodiumHttpIncoming.podlets - set legal value - should append those values with .css and .js to .css and .js',
    (t) => {
        const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
        incoming.podlets = [
            { css: [{ value: 'foo.css' }], js: [{ value: 'foo.js' }] },
            { css: [{ value: 'bar.css' }], js: [{ value: 'bar.js' }] },
            { ssc: [{ value: 'xyz.css' }], sj: [{ value: 'xyz.js' }] },
        ];
        t.same(incoming.css, [{ value: 'foo.css' }, { value: 'bar.css' }]);
        t.same(incoming.js, [{ value: 'foo.js' }, { value: 'bar.js' }]);
        t.end();
    },
);

tap.test('PodiumHttpIncoming.podlets - get value - should throw', (t) => {
    t.plan(1);
    const incoming = new HttpIncoming(ADVANCED_REQ, SIMPLE_RES);
    t.throws(
        () => {
            const foo = incoming.podlets; // eslint-disable-line no-unused-vars
        },
        /The getter for .podlets is reserved for later implementation/,
        'Should throw',
    );
    t.end();
});

tap.test(
    'PodiumHttpIncoming.toJSON() - call method - should return object without ".request" and ".response"',
    (t) => {
        const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
        const result = incoming.toJSON();
        // @ts-ignore Testing for absence
        t.equal(result.request, undefined);
        // @ts-ignore Testing for absence
        t.equal(result.response, undefined);
        t.same(result.url, {});
        t.same(result.params, {});
        t.same(result.context, {});
        t.same(result.view, {});
        t.notOk(result.proxy);
        t.notOk(result.development);
        t.equal(result.name, '');
        t.same(result.css, []);
        t.same(result.js, []);
        t.end();
    },
);

tap.test('generic typing works as expected', (t) => {
    // really only here for tsc

    /**
     * @template {{ [key: string]: unknown }} T
     * @param {( incoming: HttpIncoming<T>, fragment: string, ...args: unknown[]) => string} fn
     * @returns {void}
     */
    // eslint-disable-next-line no-unused-vars
    function view(fn) {}
    t.ok(view);
    t.end();
});

tap.test('can read values from context with default types', (t) => {
    // really only here for tsc

    /**
     * @type {HttpIncoming}
     */
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.context = {
        'podium-foo-bar': 'value',
        foo: 'value',
    };
    t.ok(incoming.context['podium-foo-bar']);
    t.ok(incoming.context.foo);
    t.ok(incoming);
    t.end();
});

tap.test('can read values from view with default types', (t) => {
    // really only here for tsc

    /**
     * @type {HttpIncoming}
     */
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.view = {
        foo: 'value',
    };
    t.ok(incoming.view.foo);
    t.ok(incoming);
    t.end();
});

tap.test('can set asset expectations and receive assets', (t) => {
    t.plan(1);
    /**
     * @type {HttpIncoming}
     */
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.assets.addExpectedAsset('foo');
    incoming.assets.addExpectedAsset('bar');

    incoming.assets.on('received', () => {
        t.ok(incoming.assets.allAssetsReceived);
        t.end();
    });

    incoming.assets.addReceivedAsset('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    incoming.assets.addReceivedAsset('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
});

tap.test('can wait for expected assets', (t) => {
    t.plan(1);
    /**
     * @type {HttpIncoming}
     */
    const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
    incoming.assets.addExpectedAsset('foo');
    incoming.assets.addExpectedAsset('bar');

    incoming.waitForAssets().then(() => {
        t.ok(incoming.assets.allAssetsReceived);
        t.end();
    });

    incoming.assets.addReceivedAsset('foo', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
    incoming.assets.addReceivedAsset('bar', {
        js: [{ value: 'foo.js' }],
        css: [{ value: 'foo.css' }],
    });
});

tap.test(
    'waitForAssets will resolve even if all assets have already been received',
    async (t) => {
        t.plan(3);
        /**
         * @type {HttpIncoming}
         */
        const incoming = new HttpIncoming(SIMPLE_REQ, SIMPLE_RES);
        incoming.assets.addExpectedAsset('foo');
        incoming.assets.addExpectedAsset('bar');

        incoming.assets.addReceivedAsset('foo', {
            js: [{ value: 'foo.js' }],
            css: [{ value: 'foo.css' }],
        });
        incoming.assets.addReceivedAsset('bar', {
            js: [{ value: 'foo.js' }],
            css: [{ value: 'foo.css' }],
        });

        const { js, css } = await incoming.waitForAssets();

        t.ok(incoming.assets.allAssetsReceived);
        t.same(js, [{ value: 'foo.js' }, { value: 'foo.js' }]);
        t.same(css, [{ value: 'foo.css' }, { value: 'foo.css' }]);
        t.end();
    },
);
