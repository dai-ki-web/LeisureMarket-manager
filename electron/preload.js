const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
  login: (data) => {
    return ipcRenderer.sendSync('login', data)
  },
  maximize: () => {
    ipcRenderer.send('maximize')
  }
})
