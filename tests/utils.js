import tap from 'tap';
import * as utils from '../lib/utils.js'

/**
 * .isString()
 */

tap.test('.isString() - no arguments given - should return false', (t) => {
    const result = utils.isString();
    t.notOk(result);
    t.end();
});  

tap.test('.isString() - arguments is an object - should return false', (t) => {
    const result = utils.isString({});
    t.notOk(result);
    t.end();
});  

tap.test('.isString() - arguments is an string - should return true', (t) => {
    const result = utils.isString('function');
    t.ok(result);
    t.end();
});  

tap.test('.isString() - arguments is an array - should return false', (t) => {
    const result = utils.isString([]);
    t.notOk(result);
    t.end();
});  

tap.test('.isString() - arguments is an boolean - should return false', (t) => {
    const result = utils.isString(true);
    t.notOk(result);
    t.end();
}); 

tap.test('.isString() - arguments is an number - should return false', (t) => {
    const result = utils.isString(42);
    t.notOk(result);
    t.end();
}); 

tap.test('.isString() - arguments is an function - should return false', (t) => {
    const result = utils.isString(() => {});
    t.notOk(result);
    t.end();
}); 

tap.test('.isString() - arguments is an arrow function - should return false', (t) => {
    const result = utils.isString(() => {});
    t.notOk(result);
    t.end();
}); 

tap.test('.isString() - arguments is an async function - should return false', (t) => {
    const result = utils.isString(async () => {});
    t.notOk(result);
    t.end();
}); 

/**
 * .isFunction()
 */

tap.test('.isFunction() - no arguments given - should return false', (t) => {
    const result = utils.isFunction();
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an object - should return false', (t) => {
    const result = utils.isFunction({});
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an string - should return false', (t) => {
    const result = utils.isFunction('function');
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an array - should return false', (t) => {
    const result = utils.isFunction([]);
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an boolean - should return false', (t) => {
    const result = utils.isFunction(true);
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an number - should return false', (t) => {
    const result = utils.isFunction(42);
    t.notOk(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an function - should return true', (t) => {
    const result = utils.isFunction(() => {});
    t.ok(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an arrow function - should return true', (t) => {
    const result = utils.isFunction(() => {});
    t.ok(result);
    t.end();
}); 

tap.test('.isFunction() - arguments is an async function - should return true', (t) => {
    const result = utils.isFunction(async () => {});
    t.ok(result);
    t.end();
}); 

/**
 * .pathnameBuilder()
 */

tap.test('.pathnameBuilder() - no arguments - should return empty String', (t) => {
    const result = utils.pathnameBuilder();
    t.equal(result, '');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument with "/" - should return single "/"', (t) => {
    const result = utils.pathnameBuilder('/');
    t.equal(result, '/');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument with double "/" - should return single "/"', (t) => {
    const result = utils.pathnameBuilder('//');
    t.equal(result, '/');
    t.end();
}); 

tap.test('.pathnameBuilder() - multiple arguments with double "/" - should return single "/"', (t) => {
    const result = utils.pathnameBuilder('//', '//', '//');
    t.equal(result, '/');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument with no "/" - should start pathname without "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('a');
    t.equal(result, 'a');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument staring with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a');
    t.equal(result, '/a');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument ending with "/" - should start pathname without "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('a/');
    t.equal(result, 'a');
    t.end();
}); 

tap.test('.pathnameBuilder() - single argument starting and ending with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/');
    t.equal(result, '/a');
    t.end();
}); 

tap.test('.pathnameBuilder() - multiple arguments all starting and ending with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d/', '/e/f/');
    t.equal(result, '/a/b/c/d/e/f');
    t.end();
}); 

tap.test('.pathnameBuilder() - multiple arguments one without "/" at end and one without "/" at the beginning - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d', 'e/f/');
    t.equal(result, '/a/b/c/d/e/f');
    t.end();
}); 

tap.test('.pathnameBuilder() - multiple arguments where the last ends with a "file extension" - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d', 'e/f.json');
    t.equal(result, '/a/b/c/d/e/f.json');
    t.end();
}); 

tap.test('.pathnameBuilder() - one argument is an Array of Strings - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', ['c', 'd'], 'e/f/');
    t.equal(result, '/a/b/c/d/e/f');
    t.end();
}); 

tap.test('.pathnameBuilder() - one argument is "undefined" - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', undefined, '/c/d/');
    t.equal(result, '/a/b/c/d');
    t.end();
}); 

tap.test('.pathnameBuilder() - one argument is not a String or Array - should start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('/a/b/', {}, '/c/d/');
    t.equal(result, '/a/b/c/d');
    t.end();
}); 

tap.test('.pathnameBuilder() - emtpy arguments at the beginning, first String starts with "/" - should ignore empty arguments start pathname with "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('', '', '/a/b/', '');
    t.equal(result, '/a/b');
    t.end();
}); 

tap.test('.pathnameBuilder() - emtpy arguments at the beginning, first String starts without "/" - should ignore empty arguments start pathname without "/", separate each entry with single "/" and end with no "/"', (t) => {
    const result = utils.pathnameBuilder('', '', 'a/b/', '');
    t.equal(result, 'a/b');
    t.end();
}); 

/**
 * .uriBuilder()
 */

tap.test('.uriBuilder() - no arguments', (t) => {
    t.plan(1);
    t.throws(() => {
        utils.uriBuilder();
    }, /Invalid URL/, 'Should throw');
    t.end();
}); 

tap.test('.uriBuilder() - "base is empty"', (t) => {
    t.plan(1);
    t.throws(() => {
        utils.uriBuilder('/podlet.html');
    }, /Invalid URL/, 'Should throw');
    t.end();
}); 

tap.test('.uriBuilder() - "base" has long path with <filename>.json - should replace <filename>.json file with "input"', (t) => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/manifest.json',
    );
    t.equal(result, 'http://localhost:7000/podlet/a/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "base" has short path with <filename>.json - should replace <filename>.json file with "input"', (t) => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/manifest.json',
    );
    t.equal(result, 'http://localhost:7000/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "base" has long path without <filename>.json - should append "input" to "base"', (t) => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/',
    );
    t.equal(result, 'http://localhost:7000/podlet/a/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "base" has short path without <filename>.json - should append "input" to "base"', (t) => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000/');
    t.equal(result, 'http://localhost:7000/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "input" does not begin with "/" - should replace <filename>.json file with "input"', (t) => {
    const result = utils.uriBuilder(
        'podlet.html',
        'http://localhost:7000/podlet/a/manifest.json',
    );
    t.equal(result, 'http://localhost:7000/podlet/a/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "base" is without <filename>.json and does not end with "/" - should append "input" to "base"', (t) => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000');
    t.equal(result, 'http://localhost:7000/podlet.html');
    t.end();
}); 

tap.test('.uriBuilder() - "extra" is provided - should append "extra"', (t) => {
    const result = utils.uriBuilder(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b',
    );
    t.equal(result, 'http://localhost:7000/foo/podlet/a/b');
    t.end();
}); 

/**
 * .uriIsRelative()
 */

tap.test('.uriIsRelative() - "uri" is relative - should return "true"', (t) => {
    t.ok(utils.uriIsRelative('/manifest.json'));
    t.end();
}); 

tap.test('.uriIsRelative() - "uri" is absolute - should return "false"', (t) => {
    t.notOk(utils.uriIsRelative('http://localhost:7000/manifest.json'));
    t.end();
}); 

/**
 * .uriRelativeToAbsolute()
 */

tap.test('.uriRelativeToAbsolute() - "input" is relative - should build absolute URI', (t) => {
    const result = utils.uriRelativeToAbsolute(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b',
    );
    t.equal(result, 'http://localhost:7000/foo/podlet/a/b');
    t.end();
}); 

tap.test('.uriRelativeToAbsolute() - "input" is absolute - should return absolute URI', (t) => {
    const result = utils.uriRelativeToAbsolute(
        'http://localhost:7000/foo/podlet/a/b',
        'http://localhost:7000/bar/',
        '/b/a',
    );
    t.equal(result, 'http://localhost:7000/foo/podlet/a/b');
    t.end();
}); 

tap.test('.uriRelativeToAbsolute() - no arguments', (t) => {
    t.plan(1);
    t.throws(() => {
        utils.uriRelativeToAbsolute();
    }, /Invalid URL/, 'Should throw');
    t.end();
}); 

/**
 * .setAtLocalsPodium()
 */

tap.test('.setAtLocalsPodium() - no arguments - should return res.locals.podium', (t) => {
    t.same(utils.setAtLocalsPodium(), {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - response argument is an empty object - should return res.locals.podium', (t) => {
    t.same(utils.setAtLocalsPodium({}), {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - response argument has .locals - should return res.locals.podium', (t) => {
    t.same(
        utils.setAtLocalsPodium({
            locals: {},
        }),
        {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - response argument has .locals.podium - should return res.locals.podium', (t) => {
    t.same(
        utils.setAtLocalsPodium({
            locals: {
                podium: {},
            },
        }),
        {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - property argument has value - should set property', (t) => {
    t.same(utils.setAtLocalsPodium({}, 'foo'), {
        locals: {
            podium: {
                foo: undefined,
            },
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - property argument is empty string - should not set property', (t) => {
    t.same(utils.setAtLocalsPodium({}, ''), {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - property argument is not string - should not set property', (t) => {
    t.same(utils.setAtLocalsPodium({}, []), {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - value argument has value - should set value on property', (t) => {
    t.same(utils.setAtLocalsPodium({}, 'foo', 'bar'), {
        locals: {
            podium: {
                foo: 'bar',
            },
        },
    });
    t.end();
}); 

tap.test('.setAtLocalsPodium() - .locals.podium already have properties - should append new property and value', (t) => {
    t.same(
        utils.setAtLocalsPodium(
            {
                locals: {
                    podium: {
                        xyz: 'zyx',
                    },
                },
            },
            'foo',
            'bar',
        ),
        {
        locals: {
            podium: {
                xyz: 'zyx',
                foo: 'bar',
            },
        },
    });
    t.end();
}); 

/**
 * .getFromLocalsPodium()
 */

tap.test('.getFromLocalsPodium() - no arguments - should return null', (t) => {
    t.equal(utils.getFromLocalsPodium(), null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - response argument is an empty object - should return null', (t) => {
    t.equal(utils.getFromLocalsPodium({}), null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - response argument has .locals - should return null', (t) => {
    t.equal(
        utils.getFromLocalsPodium({
            locals: {},
        }),
    null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - response argument has .locals.podium - should return null', (t) => {
    t.equal(
        utils.getFromLocalsPodium({
            locals: {
                podium: {},
            },
        }),
    null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - property argument has value - should get property', (t) => {
    t.equal(
        utils.getFromLocalsPodium(
            {
                locals: {
                    podium: {
                        foo: undefined,
                    },
                },
            },
            'foo',
        ),
    undefined);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - property argument is empty string - should not get property', (t) => {
    t.equal(utils.getFromLocalsPodium({}, ''), null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - property argument is not string - should not get property', (t) => {
    t.equal(utils.getFromLocalsPodium({}, []), null);
    t.end();
}); 

tap.test('.getFromLocalsPodium() - value argument has value - should set value on property', (t) => {
    t.equal(
        utils.getFromLocalsPodium(
            {
                locals: {
                    podium: {
                        foo: 'bar',
                    },
                },
            },
            'foo',
        ),
    'bar');
    t.end();
}); 

/**
 * .duplicateOnLocalsPodium()
 */

tap.test('.duplicateOnLocalsPodium() - property arguments has value - should set property on response object', (t) => {
    t.same(
        utils.duplicateOnLocalsPodium(
            {
                locals: {
                    podium: {
                        foo: 'foobar',
                    },
                },
            },
            'foo',
            'bar',
        ),
     {
        locals: {
            podium: {
                foo: 'foobar',
                bar: 'foobar',
            },
        },
    });
    t.end();
}); 

tap.test('.duplicateOnLocalsPodium() - property arguments has no value - should leave response object untouched', (t) => {
    t.same(
        utils.duplicateOnLocalsPodium({
            locals: {
                podium: {
                    foo: 'foobar',
                },
            },
        }),
    {
        locals: {
            podium: {
                foo: 'foobar',
            },
        },
    });
    t.end();
}); 

tap.test('.duplicateOnLocalsPodium() - no arguments is given - should return an object with .locals.podium property', (t) => {
    t.same(utils.duplicateOnLocalsPodium(), {
        locals: {
            podium: {},
        },
    });
    t.end();
}); 

/**
 * .serializeContext()
 */

tap.test('.serializeContext() - no arguments given - should return empty object', (t) => {
    const result = utils.serializeContext();
    t.same(result, {});
    t.end();
}); 

tap.test('.serializeContext() - headers and context is given - should copy context into headers', (t) => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': 'foo',
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context);
    t.same(result, {
        'podium-foo': 'bar',
        'podium-bar': 'foo',
        test: 'xyz',
    });
    t.end();
}); 

tap.test('.serializeContext() - one key on the context is a function - should call the function and set value on headers', (t) => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': name => `${name}-test`,
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context, 'foo');
    t.same(result, {
        'podium-foo': 'bar',
        'podium-bar': 'foo-test',
        test: 'xyz',
    });
    t.end();
}); 

/**
 * .deserializeContext()
 */

tap.test('.deserializeContext() - no arguments given - should return empty object', (t) => {
    const result = utils.deserializeContext();
    t.same(result, {});
    t.end();
}); 

tap.test('.deserializeContext() - headers argument with context is given - should return object with podium prefixed properties', (t) => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
    };

    const result = utils.deserializeContext(headers);
    t.same(result, { foo: 'bar podium' });
    t.end();
}); 

tap.test('.deserializeContext() - prefix argument with alternate value is given - should return object with only given prefixed properties', (t) => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
        'helium-foo': 'foo helium',
    };

    const result = utils.deserializeContext(headers, 'helium');
    t.same(result, { foo: 'foo helium' });
    t.end();
}); 


