const path = require('path')

function createSandbox(Hexo, options) {
  return function init (name) {
    const baseFolder = name
      ? path.join(options.fixture_folder, name)
      : path.join(__dirname, 'fixtures', 'default')

    const ctx = new Hexo(baseFolder, {silent: true})
    ctx.init()

    options.plugins.forEach(pluginPath => {
      ctx.loadPlugin(pluginPath)
    })

    return ctx
  }
}

module.exports = {
  createSandbox
}
