import test from 'ava'
import Hexo from 'hexo'
import {createSandbox} from '../../lib'
import {getHelper} from '../../lib/helpers'

const sandbox = createSandbox(Hexo)

test('retrieves helper function', async t => {
  const ctx = await sandbox()
  ctx.extend.helper.register('getRoutes', function () {
    return this.route.list()
  })

  const helper = getHelper(ctx, 'getRoutes')

  t.is(typeof helper, 'function')
  t.deepEqual(helper(), []);
})

test('retrieves nothing if is missing', async t => {
  const ctx = await sandbox()

  const helper = getHelper(ctx, 'getRoutes')

  t.is(helper, null)
})
