# unflatten

<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/unflatten.svg?branch=master)](https://travis-ci.org/vigour-io/unflatten)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/unflatten.svg)](https://badge.fury.io/js/unflatten)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/unflatten/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/unflatten?branch=master)

<!-- VDOC END -->

<!-- VDOC.jsdoc unflatten -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var obj = unflatten(subject, [opts])

Opposite of `flatten-obj`. Unflattens an object with delimited keys
- **subject** (*object*) - Object that needs to be unflattened
- **[opts]** (*object|string|boolean*) - Optional.

- Provide a string as a shortcut for `{ separator: opts }`

- Provide a boolean as a shorcut for `{ objectMode: opts }`

- Provide an object to set both options `{ separator: '/', objectMode: true }`

- Available options:

+ **separator** (*string*) - defaults to `'.'`

+ **objectMode** (*boolean*) - defaults to `false`
- **return** (*object*) obj - Nested Javascript object

<!-- VDOC END -->

```javascript
var unflatten = require('unflatten')
unflatten({
  'a.b.c': 'd'
})
/*
{
  a: {
    b: {
      c: 'd'
    }
  }
}
*/
```