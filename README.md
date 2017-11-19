# git-describeify

[![npm version](https://img.shields.io/npm/v/browserify-git-describe.svg)](https://www.npmjs.com/package/browserify-git-describe)
[![npm license](https://img.shields.io/npm/l/browserify-git-describe.svg)](https://www.npmjs.com/package/browserify-git-describe)
[![Build Status](https://travis-ci.org/idelsink/browserify-git-describe.svg?branch=master)](https://travis-ci.org/idelsink/browserify-git-describe)

This [browserify](https://www.npmjs.com/package/browserify) transform calls
[git-describe](https://www.npmjs.com/package/git-describe)
with the provided arguments on the working directory or any other directory and
parses the output to individual components. On build/transform time the
git-describe information will be injected so that it can be used in, for example,
browser served applications which have no access to the local file system.

## Installation

Available from npm:
```sh
$ npm i git-describeify
```

Tests are not included in the npm package —
clone the git repository to run tests.

## Usage

git-describeify uses the node [git-describe](https://www.npmjs.com/package/git-describe) module.
During transform, `require('git-describeify')` is replaced with the
[git-describe](https://www.npmjs.com/package/git-describe#example-output) object.  

### Browserify transform
Make sure to enable the transform in Browserify by either specifying it in the
terminal

```sh
$ browserify -t git-describeify
```

or by putting it in the `package.json`.

```json
{
  "browserify": {
    "transform": [
      "git-describeify"
    ]
  }
}
```

### Require syntax
```js
//       Require the module        the arguments passed to git-describe
require('git-describeify', argument1, argument2, argument3, ...);

// For example
const gitInfo = require('git-describeify');

// Transforms into:
const gitInfo = {
    dirty: false,
    hash: 'g3c9c15b',
    distance: 6,
    tag: 'v2.1.0-beta',
    semver: SemVer, // SemVer instance, see https://github.com/npm/node-semver
    suffix: '6-g3c9c15b',
    raw: 'v2.1.0-beta-6-g3c9c15b',
    semverString: '2.1.0-beta+6.g3c9c15b'
}
```

### More examples

```js
// Target working directory
const gitInfo = require('git-describeify');

// Target the directory of the calling script
// Recommended when you want to target the repo your app resides in
const gitInfo = require('git-describeify', __dirname);

// With options (see https://www.npmjs.com/package/git-describe)
const gitInfo = require('git-describeify', __dirname, {
    longSemver: true,
    dirtySemver: false
});

// Another example: working directory, use 16 character commit hash abbreviation
const gitInfo = require('git-describeify', {
    customArguments: ['--abbrev=16']
});

```

## Example output

```javascript
{
    dirty: false,
    hash: 'g3c9c15b',
    distance: 6,
    tag: 'v2.1.0-beta',
    semver: SemVer, // SemVer instance, see https://github.com/npm/node-semver
    suffix: '6-g3c9c15b',
    raw: 'v2.1.0-beta-6-g3c9c15b',
    semverString: '2.1.0-beta+6.g3c9c15b'
}
```

## More information

See [git-describe](https://www.npmjs.com/package/git-describe) for more information about the usage of the git-describe package.

## Test

Tests can be run by cloning the repository and running the following command.

```sh
$ npm install
$ npm test
```

[1]: https://git-scm.com/docs/git-describe
[2]: http://semver.org/
