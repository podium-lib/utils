# Podium Utils

[![Build Status](https://travis-ci.org/podium-lib/utils.svg?branch=master)](https://travis-ci.org/podium-lib/utils) [![Greenkeeper badge](https://badges.greenkeeper.io/podium-lib/utils.svg)](https://greenkeeper.io/)

Misc common / generic utility methods.

## Installation

```bash
$ npm install @podium/utils
```

## API

This module has the following API:

### .isString(str)

Checks if a value is a string.

The method takes the following arguments:

-   str - `*` - A value to check. Required.

Returns a boolean.

### .isFunction(fn)

Checks if a value is a function.

The method takes the following arguments:

-   fn - `*` - A value to check. Required.

Returns a boolean.

### .pathnameBuilder(pathname... [])

Constructs an pathname from all arguments. Returned pathname will always end without
a `/` and if the first argument starts with a `/` it will be preserved.

```js
const utils = require('@podium/utils');
const foo = 'foo/a/';
const bar = '/bar/b/';
const xyz = '/xyz/';

const pathname = utils.pathnameBuilder(foo, bar, xyz);
console.log(pathname); // outputs: foo/a/bar/b/xyz
```

### .uriBuilder(input, base, extra)

Constructs an absolute URI out of a absolute manifest URI and a relative URI.

The method takes the following arguments:

-   input - `String` - Relative URI. Required.
-   base - `String` - Absolute manifest URI to append the input too. Required.
-   extra - `String` - Relative path to be appended at the end of the URI. Optional.

Returns a resolved URI.

```js
const utils = require('@podium/utils');
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = '/here/is/content.html';

const url = utils.uriBuilder(content, manifest);
console.log(url); // outputs: http://foo.site.com/bar/here/is/content.html
```

### .uriIsRelative(uri)

Checks if a URI is relative

The method takes the following arguments:

-   uri - `String` - The URI to check. Required.

Returns a Boolean.

```js
const utils = require('@podium/utils');

utils.uriIsRelative('http://foo.site.com/bar/'); // false
utils.uriIsRelative('/bar/'); // true
```

### .uriRelativeToAbsolute(input, base, extra)

Check if a URI is absolute or relative and if relative compose an
absolute URI out of a absolute mainfest URI.

The method takes the following arguments:

-   input - `String` - Relative or absolute URI. Required.
-   base - `String` - Absolute manifest URI to append the possible relative input too. Required.
-   extra - `String` - Relative path to be appended at the end of the URI. Optional.

Returns a resolved URI.

```js
const utils = require('@podium/utils');
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = 'http://foo.site.com/here/is/content.html';

const url = utils.uriRelativeToAbsolute(content, manifest);
console.log(url); // outputs: http://foo.site.com/here/is/content.html
```

### .setAtLocalsPodium(response, property, value)

Set a value on a property on .locals.podium on a http response object.
Ensures that .locals.podium exists on the http response object.

If property is not provided, .locals.podium will be created, if not already
existing, on the response object.

The method takes the following arguments:

-   response - `Object` - A http response object.
-   property - `String` - Property for the value.
-   value - `String` - Value to store on the property.

The http response object.

```js
const obj = utils.setAtLocalsPodium({}, 'foo', 'bar');

/*
obj is now:
{
    locals: {
        podium: {
            foo: 'bar',
        },
    },
}
*/
```

### .getFromLocalsPodium(response, property)

Get the value from a property on .locals.podium on a http response object
Ensures that .locals.podium exists on the http response object.

-   response - `Object` - A http response object
-   property - `String` - Property for the value

returns The property, or `null` if it does not exist

### .duplicateOnLocalsPodium(response, fromProperty, toProperty)

Get the value from a property on .locals.podium on a http response object
and sets its value on another key.

-   response - `Object` - A http response object
-   fromProperty - `String` - Property for the existent value
-   toProperty - `String` - Property for the duplicated value

@returns {Object} The http response object

### .serializeContext(headers, context, arg)

Serialize a context object into a http header object.

The method takes the following arguments:

-   headers - `Object` - A http headers object the context will be copied into.
-   context - `Object` - A contect object to copy from
-   arg - `*` - An argument value passed on to the function if a context value is a function.

A http header object.

```js
const context = {
    'podium-foo': 'bar',
    'podium-bar': 'foo',
};

let headers = {
    test: 'xyz',
};

headers = utils.serializeContext(headers, context);

/*
headers is now:
{
    'podium-foo': 'bar',
    'podium-bar': 'foo',
    test: 'xyz',
}
*/
```

### .deserializeContext(headers, prefix)

Deserialize a context object from a http header object

The method takes the following arguments:

-   headers - `Object` - A http headers object the context will be extracted from.
-   prefix - `String` - The prefix used to mark what properties are context properties

A object containing context properties and values

```js
const headers = {
    bar: 'foo',
    'podium-foo': 'bar podium',
};

const context = utils.deserializeContext(headers);
// context is: { foo: 'bar podium' }
```
