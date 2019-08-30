const HyperToggleTranspacenry = require('./src/hyper-toggle-transparency.js')
const hyperToggleTransparency = new HyperToggleTranspacenry()

exports.onWindow = win => hyperToggleTransparency.setWindow(win)
exports.decorateConfig = appConfig => hyperToggleTransparency.decorateConfig(appConfig)
exports.decorateMenu = menu => hyperToggleTransparency.decorateMenu(menu)
