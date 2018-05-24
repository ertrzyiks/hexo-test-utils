import test from 'ava'
import Hexo from 'hexo'
import {createSandbox} from '../../lib'
import {hasRoute} from '../../lib/routing'

const sandbox = createSandbox(Hexo)

test(async t => {
  const ctx = await sandbox()
  t.is(hasRoute(ctx, 'some-route'), false)
})

test(async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', 'Content here')
  t.is(hasRoute(ctx, 'some-route'), true)
})

test(async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', 'Content here')
  ctx.route.remove('some-route')
  t.is(hasRoute(ctx, 'some-route'), false)
})

test(async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', 'Content here')
  t.is(hasRoute(ctx, /some-ro.te/), true)
})

test(async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', 'Content here')
  t.is(hasRoute(ctx, /some-ro.....te/), false)
})
