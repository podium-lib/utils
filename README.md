# Podium Utils v5

Common generic utility methods shared by @podium modules.

![GitHub Actions status](https://github.com/podium-lib/utils/workflows/Run%20Lint%20and%20Tests/badge.svg)

## Installation

```bash
npm install @podium/utils
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
import { pathnameBuilder } from '@podium/utils';
const foo = 'foo/a/';
const bar = '/bar/b/';
const xyz = '/xyz/';

const pathname = pathnameBuilder(foo, bar, xyz);
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
import { uriBuilder } from '@podium/utils';
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = '/here/is/content.html';

const url = uriBuilder(content, manifest);
console.log(url); // outputs: http://foo.site.com/bar/here/is/content.html
```

### .uriIsRelative(uri)

Checks if a URI is relative

The method takes the following arguments:

-   uri - `String` - The URI to check. Required.

Returns a Boolean.

```js
import { uriIsRelative } from '@podium/utils';

uriIsRelative('http://foo.site.com/bar/'); // false
uriIsRelative('/bar/'); // true
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
import { uriRelativeToAbsolute } from '@podium/utils';
const manifest = 'http://foo.site.com/bar/manifest.json';
const content = 'http://foo.site.com/here/is/content.html';

const url = uriRelativeToAbsolute(content, manifest);
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
import { setAtLocalsPodium } from '@podium/utils';
const obj = setAtLocalsPodium({}, 'foo', 'bar');

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
import { serializeContext } from '@podium/utils';
const context = {
    'podium-foo': 'bar',
    'podium-bar': 'foo',
};

let headers = {
    test: 'xyz',
};

headers = serializeContext(headers, context);

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
import { deserializeContext } from '@podium/utils';
const headers = {
    bar: 'foo',
    'podium-foo': 'bar podium',
};

const context = deserializeContext(headers);
// context is: { foo: 'bar podium' }
```

### .template(data)

Shared template function for use in layout and podlet

This method takes a single argument:

-   data - `Object` - An object with template variables as key/value pairs

`data` can contain any of the following keys:

-   `data.title` - document title
-   `data.locale` - language tag/locale identifier defaults to `en-US`
-   `data.encoding` - defaults to `utf-8`
-   `data.head` - Any additional HTML markup that should be placed in the document `<head>`
-   `data.js` - JavaScript URL, will be used as a `src` value in a script tag
-   `data.css` - CSS URL, will be used as an `href` value in a link tag
-   `data.body` - HTML body markup to be rendered

### .buildLinkElement(assetCss)

Build a HTML link element out of a AssetCss object.

The method takes the following arguments:

-   assetCss - `Object` - A CSS Asset object

```js
import { AssetCss, buildLinkElement } from '@podium/utils';

const css = new AssetCss({
    value: 'https://cdn.foo.com/style.css',
});

const element = buildLinkElement(css);
// element is: <link href="" .....
```

returns A HTML link element as a String.

### .buildScriptElement(assetJs)

Build a HTML script element out of a AssetJs object.

The method takes the following arguments:

-   assetJs - `Object` - A JS Asset object

```js
import { AssetJs, buildScriptElement } from '@podium/utils';

const js = new utils.AssetJs({
    value: 'https://cdn.foo.com/script.js',
});

const element = utils.buildScriptElement(js);
// element is: <script src="" .....
```

returns A HTML script element as a String.
