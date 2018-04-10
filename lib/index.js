import path from 'path'
import Promise from 'bluebird'

/**
 * A Hexo context object
 * @typedef {Object} HexoContext
 */

/**
 * @module hexo-test-utils
 */

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
 *  - use helper methods from this package, like {@link module:hexo-test-utils/core.mockConfig|mockConfig}
 *  - provide a folder with fixture files
 *
 * @param {constructor} Hexo - Hexo constructor to be used
 * @param {Object} options - Sandbox options
 * @param {string} options.fixture_folder - a root path to the folder with fixtures
 * @param {string[]} options.plugins - list of plugins paths to be loaded in your Sandbox
 * @return {sandboxFactoryFn} a Sandbox factory function
 *
 * @example <caption>Basic example</caption>
 * const {createSandbox} = require('hexo-test-utils')
 * const Hexo = require('hexo')
 * const sandbox = createSandbox(Hexo)
 *
 * const ctx = sandbox()
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
 * const ctx = sandbox('test1')
 *
 * @example <caption>Example with custom plugins</caption>
 * const {createSandbox} = require('hexo-test-utils')
 * const Hexo = require('hexo')
 * const path = require('path')
 *
 * const sandbox = createSandbox(Hexo, {
 *   plugins: [
 *     path.join(__dirname, '..', 'src')
 *   ]
 * })
 *
 * const ctx = sandbox()
 */
export function createSandbox(Hexo, options) {
  options = {
    plugins: [],
    ...options
  }

  return function init (name) {
    const baseFolder = name
      ? path.join(options.fixture_folder, name)
      : path.join(__dirname, 'fixtures', 'default')

    const ctx = new Hexo(baseFolder, {silent: true})

    return ctx.init()
      .then(() => {
        return Promise.each(options.plugins, pluginPath => {
          ctx.loadPlugin(pluginPath)
        })
      })
      .then(() => ctx)
  }
}

/**
 * @callback sandboxFactoryFn
 * @param {string} name
 * @return {HexoContext}
 */
