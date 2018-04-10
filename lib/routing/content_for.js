import streamToPromise from 'stream-to-promise'

export function contentFor(ctx, path) {
  const contentStream = ctx.route.get(path)
  return streamToPromise(contentStream).then(buffers => Buffer.concat(buffers))
}
