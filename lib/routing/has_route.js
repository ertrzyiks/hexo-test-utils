export function hasRoute(ctx, path) {
  return ctx.route.get(path) != null
}
