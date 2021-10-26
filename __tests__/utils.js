'use strict';

const utils = require('../lib/utils');

/**
 * .isString()
 */

test('.isString() - no arguments given - should return false', () => {
    const result = utils.isString();
    expect(result).toEqual(false);
});

test('.isString() - arguments is an object - should return false', () => {
    const result = utils.isString({});
    expect(result).toEqual(false);
});

test('.isString() - arguments is an string - should return true', () => {
    const result = utils.isString('function');
    expect(result).toEqual(true);
});

test('.isString() - arguments is an array - should return false', () => {
    const result = utils.isString([]);
    expect(result).toEqual(false);
});

test('.isString() - arguments is an boolean - should return false', () => {
    const result = utils.isString(true);
    expect(result).toEqual(false);
});

test('.isString() - arguments is an number - should return false', () => {
    const result = utils.isString(42);
    expect(result).toEqual(false);
});

test('.isString() - arguments is an function - should return false', () => {
    const result = utils.isString(() => {});
    expect(result).toEqual(false);
});

test('.isString() - arguments is an arrow function - should return false', () => {
    const result = utils.isString(() => {});
    expect(result).toEqual(false);
});

test('.isString() - arguments is an async function - should return false', () => {
    const result = utils.isString(async () => {});
    expect(result).toEqual(false);
});

/**
 * .isFunction()
 */

test('.isFunction() - no arguments given - should return false', () => {
    const result = utils.isFunction();
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an object - should return false', () => {
    const result = utils.isFunction({});
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an string - should return false', () => {
    const result = utils.isFunction('function');
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an array - should return false', () => {
    const result = utils.isFunction([]);
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an boolean - should return false', () => {
    const result = utils.isFunction(true);
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an number - should return false', () => {
    const result = utils.isFunction(42);
    expect(result).toEqual(false);
});

test('.isFunction() - arguments is an function - should return true', () => {
    const result = utils.isFunction(() => {});
    expect(result).toEqual(true);
});

test('.isFunction() - arguments is an arrow function - should return true', () => {
    const result = utils.isFunction(() => {});
    expect(result).toEqual(true);
});

test('.isFunction() - arguments is an async function - should return true', () => {
    const result = utils.isFunction(async () => {});
    expect(result).toEqual(true);
});

/**
 * .pathnameBuilder()
 */

test('.pathnameBuilder() - no arguments - should return empty String', () => {
    const result = utils.pathnameBuilder();
    expect(result).toBe('');
});

test('.pathnameBuilder() - single argument with "/" - should return single "/"', () => {
    const result = utils.pathnameBuilder('/');
    expect(result).toBe('/');
});

test('.pathnameBuilder() - single argument with double "/" - should return single "/"', () => {
    const result = utils.pathnameBuilder('//');
    expect(result).toBe('/');
});

test('.pathnameBuilder() - multiple arguments with double "/" - should return single "/"', () => {
    const result = utils.pathnameBuilder('//', '//', '//');
    expect(result).toBe('/');
});

test('.pathnameBuilder() - single argument with no "/" - should start pathname without "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('a');
    expect(result).toBe('a');
});

test('.pathnameBuilder() - single argument staring with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a');
    expect(result).toBe('/a');
});

test('.pathnameBuilder() - single argument ending with "/" - should start pathname without "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('a/');
    expect(result).toBe('a');
});

test('.pathnameBuilder() - single argument starting and ending with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/');
    expect(result).toBe('/a');
});

test('.pathnameBuilder() - multiple arguments all starting and ending with "/" - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d/', '/e/f/');
    expect(result).toBe('/a/b/c/d/e/f');
});

test('.pathnameBuilder() - multiple arguments one without "/" at end and one without "/" at the beginning - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d', 'e/f/');
    expect(result).toBe('/a/b/c/d/e/f');
});

test('.pathnameBuilder() - multiple arguments where the last ends with a "file extension" - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', '/c/d', 'e/f.json');
    expect(result).toBe('/a/b/c/d/e/f.json');
});

test('.pathnameBuilder() - one argument is an Array of Strings - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', ['c', 'd'], 'e/f/');
    expect(result).toBe('/a/b/c/d/e/f');
});

test('.pathnameBuilder() - one argument is an Array of String paths - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', ['/c/d'], 'e/f/');
    expect(result).toBe('/a/b/c/d/e/f');
});

test('.pathnameBuilder() - one argument is "undefined" - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', undefined, '/c/d/');
    expect(result).toBe('/a/b/c/d');
});

test('.pathnameBuilder() - one argument is not a String or Array - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('/a/b/', {}, '/c/d/');
    expect(result).toBe('/a/b/c/d');
});

test('.pathnameBuilder() - emtpy arguments at the beginning, first String starts with "/" - should ignore empty arguments start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('', '', '/a/b/', '');
    expect(result).toBe('/a/b');
});

test('.pathnameBuilder() - emtpy arguments at the beginning, first String starts without "/" - should ignore empty arguments start pathname without "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('', '', 'a/b/', '');
    expect(result).toBe('a/b');
});

test('.pathnameBuilder() - path is a http origin - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('http://foo.com/b/', '/c/d/', '/e/f/');
    expect(result).toBe('/c/d/e/f');
});

test('.pathnameBuilder() - path is a https origin - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder('http://foo.com/b/', '/c/d/', '/e/f/');
    expect(result).toBe('/c/d/e/f');
});

test('.pathnameBuilder() - path is an array with a origin - should start pathname with "/", separate each entry with single "/" and end with no "/"', () => {
    const result = utils.pathnameBuilder(['http://foo.com/b/'], '/c/d/', '/e/f/');
    expect(result).toBe('/c/d/e/f');
});

/**
 * .uriBuilder()
 */

test('.uriBuilder() - no arguments - should throw', () => {
    expect(() => {
        utils.uriBuilder();
    }).toThrowError(/Invalid URL/);
});

test('.uriBuilder() - "base is empty" - should throw', () => {
    expect(() => {
        utils.uriBuilder('/podlet.html');
    }).toThrowError(/Invalid URL/);
});

test('.uriBuilder() - "base" has long path with <filename>.json - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/manifest.json',
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" has short path with <filename>.json - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/manifest.json',
    );
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "base" has long path without <filename>.json - should append "input" to "base"', () => {
    const result = utils.uriBuilder(
        '/podlet.html',
        'http://localhost:7000/podlet/a/',
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" has short path without <filename>.json - should append "input" to "base"', () => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000/');
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "input" does not begin with "/" - should replace <filename>.json file with "input"', () => {
    const result = utils.uriBuilder(
        'podlet.html',
        'http://localhost:7000/podlet/a/manifest.json',
    );
    expect(result).toBe('http://localhost:7000/podlet/a/podlet.html');
});

test('.uriBuilder() - "base" is without <filename>.json and does not end with "/" - should append "input" to "base"', () => {
    const result = utils.uriBuilder('/podlet.html', 'http://localhost:7000');
    expect(result).toBe('http://localhost:7000/podlet.html');
});

test('.uriBuilder() - "extra" is provided - should append "extra"', () => {
    const result = utils.uriBuilder(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b',
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

/**
 * .uriIsRelative()
 */

test('.uriIsRelative() - "uri" is relative - should return "true"', () => {
    expect(utils.uriIsRelative('/manifest.json')).toBe(true);
});

test('.uriIsRelative() - "uri" is absolute - should return "false"', () => {
    expect(utils.uriIsRelative('http://localhost:7000/manifest.json')).toBe(
        false,
    );
});

/**
 * .uriRelativeToAbsolute()
 */

test('.uriRelativeToAbsolute() - "input" is relative - should build absolute URI', () => {
    const result = utils.uriRelativeToAbsolute(
        '/podlet',
        'http://localhost:7000/foo/',
        '/a/b',
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

test('.uriRelativeToAbsolute() - "input" is absolute - should return absolute URI', () => {
    const result = utils.uriRelativeToAbsolute(
        'http://localhost:7000/foo/podlet/a/b',
        'http://localhost:7000/bar/',
        '/b/a',
    );
    expect(result).toBe('http://localhost:7000/foo/podlet/a/b');
});

test('.uriRelativeToAbsolute() - no arguments - should throw', () => {
    expect.hasAssertions();

    expect(() => {
        utils.uriRelativeToAbsolute();
    }).toThrowError(/Invalid URL/);
});

/**
 * .setAtLocalsPodium()
 */

test('.setAtLocalsPodium() - no arguments - should return res.locals.podium', () => {
    expect(utils.setAtLocalsPodium()).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument is an empty object - should return res.locals.podium', () => {
    expect(utils.setAtLocalsPodium({})).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument has .locals - should return res.locals.podium', () => {
    expect(
        utils.setAtLocalsPodium({
            locals: {},
        }),
    ).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - response argument has .locals.podium - should return res.locals.podium', () => {
    expect(
        utils.setAtLocalsPodium({
            locals: {
                podium: {},
            },
        }),
    ).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - property argument has value - should set property', () => {
    expect(utils.setAtLocalsPodium({}, 'foo')).toEqual({
        locals: {
            podium: {
                foo: undefined,
            },
        },
    });
});

test('.setAtLocalsPodium() - property argument is empty string - should not set property', () => {
    expect(utils.setAtLocalsPodium({}, '')).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - property argument is not string - should not set property', () => {
    expect(utils.setAtLocalsPodium({}, [])).toEqual({
        locals: {
            podium: {},
        },
    });
});

test('.setAtLocalsPodium() - value argument has value - should set value on property', () => {
    expect(utils.setAtLocalsPodium({}, 'foo', 'bar')).toEqual({
        locals: {
            podium: {
                foo: 'bar',
            },
        },
    });
});

test('.setAtLocalsPodium() - .locals.podium already have properties - should append new property and value', () => {
    expect(
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
    ).toEqual({
        locals: {
            podium: {
                xyz: 'zyx',
                foo: 'bar',
            },
        },
    });
});

/**
 * .getFromLocalsPodium()
 */

test('.getFromLocalsPodium() - no arguments - should return null', () => {
    expect(utils.getFromLocalsPodium()).toBeNull();
});

test('.getFromLocalsPodium() - response argument is an empty object - should return null', () => {
    expect(utils.getFromLocalsPodium({})).toBeNull();
});

test('.getFromLocalsPodium() - response argument has .locals - should return null', () => {
    expect(
        utils.getFromLocalsPodium({
            locals: {},
        }),
    ).toBeNull();
});

test('.getFromLocalsPodium() - response argument has .locals.podium - should return null', () => {
    expect(
        utils.getFromLocalsPodium({
            locals: {
                podium: {},
            },
        }),
    ).toBeNull();
});

test('.getFromLocalsPodium() - property argument has value - should get property', () => {
    expect(
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
    ).toBeUndefined();
});

test('.getFromLocalsPodium() - property argument is empty string - should not get property', () => {
    expect(utils.getFromLocalsPodium({}, '')).toBeNull();
});

test('.getFromLocalsPodium() - property argument is not string - should not get property', () => {
    expect(utils.getFromLocalsPodium({}, [])).toBeNull();
});

test('.getFromLocalsPodium() - value argument has value - should set value on property', () => {
    expect(
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
    ).toEqual('bar');
});

/**
 * .duplicateOnLocalsPodium()
 */

test('.duplicateOnLocalsPodium() - property arguments has value - should set property on response object', () => {
    expect(
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
    ).toEqual({
        locals: {
            podium: {
                foo: 'foobar',
                bar: 'foobar',
            },
        },
    });
});

test('.duplicateOnLocalsPodium() - property arguments has no value - should leave response object untouched', () => {
    expect(
        utils.duplicateOnLocalsPodium({
            locals: {
                podium: {
                    foo: 'foobar',
                },
            },
        }),
    ).toEqual({
        locals: {
            podium: {
                foo: 'foobar',
            },
        },
    });
});

test('.duplicateOnLocalsPodium() - no arguments is given - should return an object with .locals.podium property', () => {
    expect(utils.duplicateOnLocalsPodium()).toEqual({
        locals: {
            podium: {},
        },
    });
});

/**
 * .serializeContext()
 */

test('.serializeContext() - no arguments given - should return empty object', () => {
    const result = utils.serializeContext();
    expect(result).toEqual({});
});

test('.serializeContext() - headers and context is given - should copy context into headers', () => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': 'foo',
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context);
    expect(result).toEqual({
        'podium-foo': 'bar',
        'podium-bar': 'foo',
        test: 'xyz',
    });
});

test('.serializeContext() - one key on the context is a function - should call the function and set value on headers', () => {
    const context = {
        'podium-foo': 'bar',
        'podium-bar': name => `${name}-test`,
    };

    const headers = {
        test: 'xyz',
    };

    const result = utils.serializeContext(headers, context, 'foo');
    expect(result).toEqual({
        'podium-foo': 'bar',
        'podium-bar': 'foo-test',
        test: 'xyz',
    });
});

/**
 * .deserializeContext()
 */

test('.deserializeContext() - no arguments given - should return empty object', () => {
    const result = utils.deserializeContext();
    expect(result).toEqual({});
});

test('.deserializeContext() - headers argument with context is given - should return object with podium prefixed properties', () => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
    };

    const result = utils.deserializeContext(headers);
    expect(result).toEqual({ foo: 'bar podium' });
});

test('.deserializeContext() - prefix argument with alternate value is given - should return object with only given prefixed properties', () => {
    const headers = {
        bar: 'foo',
        'podium-foo': 'bar podium',
        'helium-foo': 'foo helium',
    };

    const result = utils.deserializeContext(headers, 'helium');
    expect(result).toEqual({ foo: 'foo helium' });
});


