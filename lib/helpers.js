/**
 * @module hexo-test-utils/helpers
 */

/**
 * ```
 * // CommonJS
 * const {getHelper} = require('hexo-test-utils/helpers')
 *
 * // ES2015
 * import {getHelper} from 'hexo-test-utils/helpers'
 * ```
 *
 * Retrieves a helper function.
 * Read the Hexo documentation on [how to register a helper](https://hexo.io/api/helper.html)
 *
 * @param {HexoContext} ctx
 * @param {string} name - helper name
 * @return {Function} - a helper function
 */
export function getHelper(ctx, name) {
  return ctx.extend.helper.get(name)
}

/**
 * ```
 * // CommonJS
 * const {hasHelper} = require('hexo-test-utils/helpers')
 *
 * // ES2015
 * import {hasHelper} from 'hexo-test-utils/helpers'
 * ```
 * @param {HexoContext} ctx
 * @param {string} name - helper name
 * @returns {boolean}
 */
export function hasHelper(ctx, name) {
  return typeof getHelper(ctx, name) !== 'undefined'
}
