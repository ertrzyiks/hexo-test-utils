/**
 * @module routing
 */

import streamToPromise from 'stream-to-promise'
import Promise from 'bluebird'

/**
 * ```
 * // CommonJS
 * const {contentFor} = require('hexo-test-utils')
 *
 * // ES2015
 * import {contentFor} from 'hexo-test-utils'
 * ```
 *
 * Loads the content of the file on a given path
 *
 * @param {HexoContext} ctx
 * @param {string} path - a path to the file, relative to the root URL, for example `/content/my_image.jpg`
 * @return {Promise.<Buffer>}
 */
export function contentFor(ctx, path) {
  if (!hasRoute(ctx, path)) {
    return Promise.reject(new Error('Route "' + path + '" not found'))
  }

  const contentStream = ctx.route.get(path)
  return streamToPromise(contentStream).then(buffers => {
    const realBuffers = buffers.map(buffer => {
      if (typeof buffer == 'string') return Buffer.from(buffer, 'utf8')
      return buffer
    })

    return Buffer.concat(realBuffers)
  })
}

/**
 * ```
 * // CommonJS
 * const {hasRoute} = require('hexo-test-utils')
 *
 * // ES2015
 * import {hasRoute} from 'hexo-test-utils'
 * ```
 *
 * Checks if a given path is registered in routing, so it would be generated
 *
 * @param {HexoContext} ctx
 * @param {string|RegExp} path - a path to the file, relative to the root URL, for example `/content/my_image.jpg`
 * @return {boolean}
 */
export function hasRoute(ctx, path) {
  if (typeof path == 'object' && typeof path.exec == 'function') {
    const list = ctx.route.list()
    for (let i = 0; i < list.length; i++) {
      if (path.exec(list[i]) != null) {
        return true
      }
    }

    return false
  }

  return ctx.route.get(path) != null
}

