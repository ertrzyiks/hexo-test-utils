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

test('reads _config.yml', async t => {
  const sandbox = createSandbox(Hexo, {
    fixture_folder: path.join(__dirname, 'support', 'fixtures')
  })

  const ctx = await sandbox('configurable')

  await process(ctx)
  t.is(ctx.config['some-property'], 'some-value')
})

test('renders fixture by name', async t => {
  const sandbox = createSandbox(Hexo, {
    fixture_folder: path.join(__dirname, 'support', 'fixtures')
  })

  const ctx = await sandbox({fixtureName: 'configurable'})

  await process(ctx)
  t.is(ctx.config['some-property'], 'some-value')
})
