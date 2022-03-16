const ipcRenderer = window.ipcRenderer

export const login = (data) => {
  return new Promise((resolve, reject) => {
    let res = ipcRenderer.login(data)
    return res.code === 0 ? resolve(res) : reject(res.msg)
  })
}
