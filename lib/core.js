/**
 * @module hexo-test-utils/core
 */

/**
 * ```
 * // CommonJS
 * const {process} = require('hexo-test-utils/core')
 *
 * // ES2015
 * import {process} from 'hexo-test-utils/core'
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
 * const {mockConfig} = require('hexo-test-utils/core')
 *
 * // ES2015
 * import {mockConfig} from 'hexo-test-utils/core'
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
