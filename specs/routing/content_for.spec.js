import test from 'ava'
import Hexo from 'hexo'
import {createSandbox} from '../../lib'
import {contentFor} from '../../lib/routing'

const sandbox = createSandbox(Hexo)

test('handles missing route', async t => {
  const ctx = await sandbox()
  const error = await t.throwsAsync(() => contentFor(ctx, 'some-route'));

  t.is(error.message, 'Route "some-route" not found');
})

test('loads the text content', async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', 'Content here')
  const content = await contentFor(ctx, 'some-route')
  t.is(content.toString(), 'Content here')
})

test('loads the binary content', async t => {
  const ctx = await sandbox()
  ctx.route.set('some-route', Buffer.from([100, 101, 102]))
  const content = await contentFor(ctx, 'some-route')
  t.is(content.toString('hex'), '646566')
})
