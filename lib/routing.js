/**
 * @module hexo-test-utils/routing
 */

import streamToPromise from 'stream-to-promise'

/**
 * ```
 * // CommonJS
 * const {contentFor} = require('hexo-test-utils/routing')
 *
 * // ES2015
 * import {contentFor} from 'hexo-test-utils/routing'
 * ```
 *
 * Loads the content of the file on a given path
 *
 * @param {HexoContext} ctx
 * @param {string} path - a path to the file, relative to the root URL, for example `/content/my_image.jpg`
 * @return {*}
 */
export function contentFor(ctx, path) {
  const contentStream = ctx.route.get(path)
  return streamToPromise(contentStream).then(buffers => Buffer.concat(buffers))
}

/**
 * ```
 * // CommonJS
 * const {hasRoute} = require('hexo-test-utils/routing')
 *
 * // ES2015
 * import {hasRoute} from 'hexo-test-utils/routing'
 * ```
 *
 * Checks if a given path is registered in routing, so it would be generated
 *
 * @param {HexoContext} ctx
 * @param {string} path - a path to the file, relative to the root URL, for example `/content/my_image.jpg`
 * @return {boolean}
 */
export function hasRoute(ctx, path) {
  return ctx.route.get(path) != null
}

