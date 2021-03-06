/**
 * A Hexo context object
 * @typedef {Object} HexoContext
 */

/**
 * @callback sandboxFactoryFn
 * @param {string|object} options - a string with a fixture name or a configuration object
 * @param {string} options.fixtureName - a fixture name, the folder of the Hexo testing project
 * @param {boolean} options.skipInit - set to true if you don't want to initialize Hexo. Default: false
 * @return {Promise<HexoContext>}
 */

/**
 * @module core
 */

import path from 'path'
import Promise from 'bluebird'

/**
 * ```js
 * // CommonJS
 * const {createSandbox} = require('hexo-test-utils')
 *
 * // ES2015
 * import {createSandbox} from 'hexo-test-utils'
 * ```
 *
 * This is the main function of `hexo-test-utils` used to build a factory of sandboxes.
 *
 * By default it uses an empty fixture folder, which means no source files, no theme, no config, etc.
 * To prepare data for your test you have multiple options:
 *  - use {@link HexoContext} methods directly
 *  - use helper methods from this package, like {@link module:core.mockConfig|mockConfig}
 *  - provide a folder with fixture files
 *
 * @param {constructor} Hexo - Hexo constructor to be used
 * @param {Object} options - Sandbox options
 * @param {string} options.fixture_folder - a root path to the folder with fixtures
 * @param {string[]} options.plugins - list of plugins paths to be loaded in your Sandbox, the easiest way is to use `require.resolve`
 * @return {sandboxFactoryFn} a Sandbox factory function
 *
 * @example <caption>Basic example</caption>
 * const {createSandbox} = require('hexo-test-utils')
 * const Hexo = require('hexo')
 * const sandbox = createSandbox(Hexo)
 *
 * const ctx = await sandbox()
 *
 * @example <caption>Example with custom fixture</caption>
 * const {createSandbox} = require('hexo-test-utils')
 * const Hexo = require('hexo')
 * const path = require('path')
 *
 * const sandbox = createSandbox(Hexo, {
 *   fixture_folder: path.join(__dirname, '..', 'fixtures')
 * })
 *
 * // Create a context with a fixture folder set to '../fixtures/test1'
 * const ctx = await sandbox('test1')
 *
 * @example <caption>Example with custom plugins</caption>
 * const {createSandbox} = require('hexo-test-utils')
 * const Hexo = require('hexo')
 * const path = require('path')
 *
 * const sandbox = createSandbox(Hexo, {
 *   plugins: [
 *     require.resolve('hexo-some-plugin'),
 *     require.resolve('../src')
 *   ]
 * })
 *
 * const ctx = await sandbox()
 */
export function createSandbox(Hexo, options) {
  options = {
    plugins: [],
    ...options
  }

  return function sandboxFactoryFn (initOptions) {
    initOptions = initOptions || {}

    const name = typeof initOptions == 'string' ? initOptions : initOptions.fixtureName
    const skipInit = typeof initOptions == 'string' ? false : initOptions.skipInit

    const baseFolder = name
      ? path.join(options.fixture_folder, name)
      : path.join(__dirname, 'fixtures', 'default')

    const ctx = new Hexo(baseFolder, {silent: true})

    // Bypass the package.json check and make sure the config file can be loaded
    ctx.env.init = true

    ctx.extend.filter.register('after_init', () => {
      return Promise.each(options.plugins, pluginPath => {
        ctx.loadPlugin(pluginPath)
      })
    }, 0)

    if (skipInit) {
      return Promise.resolve(ctx)
    }

    return ctx.init().then(() => ctx)
  }
}

/**
 * ```
 * // CommonJS
 * const {init} = require('hexo-test-utils')
 *
 * // ES2015
 * import {init} from 'hexo-test-utils'
 * ```
 *
 * Initializes all plugins, generates content from folders. Useful if you need to mock main configuration like `source_dir`
 * Use with `skipInit` in {@link sandboxFactoryFn}.
 *
 * @param {HexoContext} ctx
 * @return {Promise.<HexoContext>}
 */
export function init(ctx) {
  return ctx.init().then(() => ctx)
}

/**
 * ```
 * // CommonJS
 * const {process} = require('hexo-test-utils')
 *
 * // ES2015
 * import {process} from 'hexo-test-utils'
 * ```
 *
 * Loads and processes all the blog data. After calling this function the passed {@link HexoContext} will have all information
 * about the blog.
 *
 * @param {HexoContext} ctx
 * @return {Promise.<HexoContext>}
 */
export function process(ctx) {
  return ctx.load().then(() => ctx)
}

/**
 * ```
 * // CommonJS
 * const {mockConfig} = require('hexo-test-utils')
 *
 * // ES2015
 * import {mockConfig} from 'hexo-test-utils'
 * ```
 *
 * Mocks the Hexo configuration. Useful to test the plugin with different configurations without using fixtures.
 * > Note: Make sure to call it before `process`
 *
 * @param {HexoContext} ctx
 * @param {string} name - a name of configuration, it the config YML file it would be the root key
 * @param {*} value - a new configuration for a given name, usually an Object
 */

export function mockConfig(ctx, name, value) {
  ctx.config[name] = value
}
