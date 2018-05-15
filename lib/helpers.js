/**
 * @module helpers
 */

/**
 * ```
 * // CommonJS
 * const {getHelper} = require('hexo-test-utils')
 *
 * // ES2015
 * import {getHelper} from 'hexo-test-utils'
 * ```
 *
 * Retrieves a helper function.
 * Read the Hexo documentation on [how to register a helper](https://hexo.io/api/helper.html)
 *
 * @param {HexoContext} ctx
 * @param {string} name - helper name
 * @return {Function|null} - a helper function
 */
export function getHelper(ctx, name) {
  const helper = ctx.extend.helper.get(name)
  if (!helper) {
    return null
  }

  return helper.bind(ctx)
}

/**
 * ```
 * // CommonJS
 * const {hasHelper} = require('hexo-test-utils')
 *
 * // ES2015
 * import {hasHelper} from 'hexo-test-utils'
 * ```
 * @param {HexoContext} ctx
 * @param {string} name - helper name
 * @returns {boolean}
 */
export function hasHelper(ctx, name) {
  return typeof getHelper(ctx, name) !== 'undefined'
}
