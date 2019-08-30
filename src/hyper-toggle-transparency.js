const Color = require('color')
const os = require('os')

module.exports = class HyperToggleTranspacenry {

  constructor () {
    this.config = {
      current_transparency: 1,
      transparency: 0.8
    }
    this.windows = []
  }

  setTransparency (value) {
    this.config.current_transparency = value
    this.windows.map(win => win.setOpacity(value))
  }

  setWindow (win) {
    this.windows.push(win)

    // Fixes ghosting issues.
    // See: https://github.com/electron/electron/issues/8847
    win.setHasShadow(false)

    win.on('close', e => this.removeWindow(e.sender))
  }

  removeWindow (closedWin) {
    this.windows = this.windows.filter(win => win !== closedWin)
  }

  getTransparencyMenu () {
    const accelerator = os.type() === 'Darwin' ? 'cmd+u' : 'ctrl+u'
    return {
      label: 'Toggle transparency',
      accelerator: accelerator,
      click: () => {
        const current_value = this.config.current_transparency;
        if (current_value === 1.0) {
          this.setTransparency(this.config.transparency)
        } else {
          this.setTransparency(1.0)
        }
      }
    }
  }

  decorateMenu (menu) {
    const separator = {type: 'separator'}
    const transparencyMenu = this.getTransparencyMenu()

    // add transparency menu inside View menu
    menu.map((menuItem) => {
      if (menuItem.label === 'View') {
        menuItem.submenu.push(separator)
        menuItem.submenu.push(transparencyMenu)
      }
    })

    return menu
  }

  decorateConfig (appConfig) {
    // Preffer manual config set on .hyper.js main config file.
    const hyperToggleTransparency = appConfig.hyperToggleTransparency || {}

    if ( hyperToggleTransparency.opacity ) {
      this.config.transparency = hyperToggleTransparency.opacity
    }

    return appConfig
  }

}
