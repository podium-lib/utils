/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`tests/html-document.test.js TAP .document() - "type" is "module", "strategy" is set - should place assets based on strategy > must match snapshot 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl1.com" type="text/css">
        <script src="http://somejsurl2.com/before" type="module"></script>
        <title></title>
        
    </head>
    <body>
        
        <script src="http://somejsurl3.com/after" type="module"></script>
        <script type="module">import("http://somejsurl1.com/lazy")</script>
    </body>
</html>
`

exports[`tests/html-document.test.js TAP .document() - arguments given - handles v4 js and css syntax > should render template using values given 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl1.com" type="text/css">
        <link href="http://somecssurl2.com" type="text/css">
        <link href="http://somecssurl3.com" type="text/css">
        
        <title></title>
        
    </head>
    <body>
        
        <script src="http://somejsurl1.com"></script>
        <script src="http://somejsurl2.com"></script>
        <script src="http://somejsurl3.com"></script>
        
    </body>
</html>
`

exports[`tests/html-document.test.js TAP .document() - arguments given > should render template using values given 1`] = `
<!doctype html>
<html lang="en-NZ">
    <head>
        <meta charset="utf-pretend-encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl.com">
        
        <title>this goes in the title tag</title>
        this goes in the head section
    </head>
    <body>
        this goes in the body section
        <script src="http://somejsurl.com"></script>
        
    </body>
</html>
`

exports[`tests/html-document.test.js TAP .document() - js "type" is "esm" > should set type to module on script tags 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl1.com" type="text/css">
        <link href="http://somecssurl2.com" type="text/css">
        <link href="http://somecssurl3.com" type="text/css">
        
        <title></title>
        
    </head>
    <body>
        
        <script src="http://somejsurl1.com" type="module"></script>
        <script src="http://somejsurl2.com" type="module"></script>
        <script src="http://somejsurl3.com" type="module"></script>
        
    </body>
</html>
`

exports[`tests/html-document.test.js TAP .document() - no arguments given > should render template 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        
        
        <title></title>
        
    </head>
    <body>
        
        
        
    </body>
</html>
`
