# hexo-test-utils
[![Build Status](https://travis-ci.org/ertrzyiks/hexo-test-utils.svg?branch=master)](https://travis-ci.org/ertrzyiks/hexo-test-utils)

[Hexo](https://github.com/hexojs/hexo) is quite easy to write tests for, but the needed boilerplate code can be a barrier.
This packages provides a set of utils to simplify testing Hexo plugins.

Offered features:
 - Sandbox environment
 - high level functions for Hexo internals
 - ECMAScript5 compatibility

## Sandbox

The main feature is a Sandbox. It allows to create an isolated environment of Hexo blog. Combined
with a fixture, it's easy to prepare all need files, process the blog and assert the output.

To create a Sandbox instance, first you need to create a factory with `createSandbox`:

```js
const {createSandbox} = require('hexo-test-utils')
const Hexo = require('hexo')
const path = require('path')

const sandbox = createSandbox(Hexo, {
  fixture_folder: path.join(__dirname, '..', 'fixtures'),
  plugins: [
    path.join(__dirname, '..', 'src')
  ]
})
```

Now, the `sandbox` is a function which returns a new context - an instance of Hexo blog which is ready for processing.

### Using fixture folder
If `fixture_folder` is set, the factory function accepts one parameter, name of the fixture folder where live all fixture files.

To prepare a fixture with one post, create folder `./fixtures/one-post/source/_posts/` and put the markdown file there.

```js
const context = sandbox('one-post')
```

At this moment, the Hexo blog is created, but no files are loaded. To start the loading process, call `process` method.

```
const {process} = require('hexo-test-utils/core')

process(context).then(() => {
  // Hexo processed the ./fixtures/one-post/ folder as a blog
})
```

Now you can start check the behavior of your plugin.

> Note: no files were actually saved on the hard drive, all the process happened in memory.

### Empty Sandbox

You can skip `fixture_folder` if you don't need any files to exists, for example when testing a view helper in isolation.
The factory function will have no parameters then and the Sandbox will be an empty Hexo project - no posts, no theme, no assets.

You can still use Hexo API to provide fixtures programmatically.
