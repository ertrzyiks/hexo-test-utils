import test from 'ava'
import Hexo from 'hexo'
import {createSandbox} from '../../lib'
import {mockConfig} from '../../lib/core'

const sandbox = createSandbox(Hexo)

test(async t => {
  const ctx = await sandbox()

  mockConfig(ctx, 'my_field', 'my_value')

  t.is(ctx.config.my_field, 'my_value')
})
