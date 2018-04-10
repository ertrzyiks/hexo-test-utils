const path = require('path')
const Promise = require('bluebird')

export function createSandbox(Hexo, options) {
  options = {
    plugins: [],
    ...options
  }

  return function init (name) {
    const baseFolder = name
      ? path.join(options.fixture_folder, name)
      : path.join(__dirname, 'fixtures', 'default')

    const ctx = new Hexo(baseFolder, {silent: true})

    return ctx.init()
      .then(() => {
        return Promise.each(options.plugins, pluginPath => {
          ctx.loadPlugin(pluginPath)
        })
      })
      .then(() => ctx)
  }
}
