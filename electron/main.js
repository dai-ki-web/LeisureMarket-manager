const { app, BrowserWindow, ipcMain, screen } = require('electron')
let sqlite = require('sqlite3').verbose()
let path = require('path')

let win = null
let db = null
const dbFileName = 'manager.db'
const windowConfig = {
  width: 800,
  height: 600,
  autoHideMenuBar: true,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
}

function createWindow() {
  win = new BrowserWindow(windowConfig)// 创建一个窗口
  // 连接数据库
  db = new sqlite.Database(path.join(__dirname, dbFileName), (err) => {
    if (!err) {
      console.log('数据库' + dbFileName + '已连接！')
    } else {
      console.log('连接出错了(> - <)')
    }
  })

  // win.loadURL(`file://${__dirname}/index.html`);//在窗口内要展示的内容index.html 就是打包生成的index.html
  win.loadURL('http://localhost:8080')// 开发用
  win.webContents.openDevTools() // 开启调试工具

  win.on('close', () => {
    // 回收BrowserWindow对象
    win = null
  })
  win.on('resize', () => {
    win.reload()
  })
};

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (win == null) {
    createWindow()
  }
  // if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 进程通信

// 监听用户登录
ipcMain.on('login', (e, arg) => {
  console.log(e, arg)
  db.all('select ID,PASSWORD from admin where ID=?', [arg.id], (err, rows) => {
    if (!err) {
      if (rows[0]) {
        e.returnValue = rows[0].PASSWORD === arg.password ? { code: 0, msg: '' } : { code: 1, msg: '密码不正确！' }
      } else {
        console.log(`出错了(> - <),找不到`)
        e.returnValue = { code: 1, msg: '用户未注册！' }
      }
    } else {
      console.log(`出错了(> - <),${err}`)
      e.returnValue = { code: 1, msg: err }
    }
  })
})

// 监听登录后页面最大化
ipcMain.once('maximize', (e, arg) => {
  // win.maximize()
  const bounds = screen.getPrimaryDisplay().workArea
  win.setBounds(bounds)
})
