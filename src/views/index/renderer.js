const ipcRenderer = window.ipcRenderer

export const maximize = () => {
  ipcRenderer.maximize()
}
