import test from 'ava'
import path from 'path'
import Hexo from 'hexo'
import {createSandbox} from '../lib'
import {process} from '../lib/core'

test(t => {
  const sandbox = createSandbox(Hexo)
  t.is(typeof sandbox, 'function')
})

test(async t => {
  const sandbox = createSandbox(Hexo, {
    plugins: [path.join(__dirname, 'support', 'plugins', 'test', 'index.js')]
  })

  const ctx = await sandbox()

  await process(ctx)
  t.is(ctx.locals.get('test-utils-example'), 'it works')
})
