/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */

'use strict'

exports[`tests/html-document.js TAP .document() - arguments given - handles v4 js and css syntax > should render template using values given 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl1.com" type="text/css">
        <link href="http://somecssurl2.com" type="text/css">
        <link href="http://somecssurl3.com" type="text/css">
        <script src="http://somejsurl1.com"></script>
        <script src="http://somejsurl2.com"></script>
        <script src="http://somejsurl3.com"></script>
        <title></title>
        
    </head>
    <body>
        
    </body>
</html>
`

exports[`tests/html-document.js TAP .document() - arguments given > should render template using values given 1`] = `
<!doctype html>
<html lang="en-NZ">
    <head>
        <meta charset="utf-pretend-encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl.com">
        <script src="http://somejsurl.com"></script>
        <title>this goes in the title tag</title>
        this goes in the head section
    </head>
    <body>
        this goes in the body section
    </body>
</html>
`

exports[`tests/html-document.js TAP .document() - js "type" is "esm" > should set type to module on script tags 1`] = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link href="http://somecssurl1.com" type="text/css">
        <link href="http://somecssurl2.com" type="text/css">
        <link href="http://somecssurl3.com" type="text/css">
        <script src="http://somejsurl1.com" type="module"></script>
        <script src="http://somejsurl2.com" type="module"></script>
        <script src="http://somejsurl3.com" type="module"></script>
        <title></title>
        
    </head>
    <body>
        
    </body>
</html>
`

exports[`tests/html-document.js TAP .document() - no arguments given > should render template 1`] = `
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
