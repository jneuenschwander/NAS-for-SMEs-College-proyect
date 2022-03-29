const { 
  app, 
  BrowserWindow, 
  ipcMain, 
  Tray, 
  Menu,
  dialog,
  Notification
} = require('electron');
const fs = require('fs');
const Store = require('electron-store');
const axios =  require('axios');
const isOnline = require('is-online');
const { sync } = require('sync-files-cipher')//require('../../syncProyect/dist/index')
const path = require('path');
const url = require('url');
const { channels } = require('../src/shared/constants');
const tryIcon = path.join(__dirname,'favicon.ico');
const store = new Store();
var watcher;
var haveInternet;
let mainWindow;
var pathWatchDirectory;
let tray;
const trayMenuTemplate = [
  {
    label: 'Close',
    click: () => {
      if(watcher) watcher.close();
      if(haveInternet) window.clearInterval(haveInternet);
      app.quitting = true
      app.quit();
    }
  },
  {
    label: 'Show',
    click: () => {
      mainWindow.show();
      tray.destroy()
    }
  },
  {
    label: 'Log out',
    click: () => {
      mainWindow.webContents
      .executeJavaScript('localStorage.removeItem("user");', true)
      .then(result => {
        mainWindow.reload();
        tray.destroy();
        mainWindow.show();
        store.delete('user');
        store.delete('sync');
        if(haveInternet) window.clearInterval(haveInternet);
      });
      

    }
  }
];
const menuBarTemplate = [
  {
    label: 'JFLS'
  },
  
  {
    label: 'Syncronization',
    submenu: [
      {
        label: 'Select directory',
        click: () => {
          mainWindow.webContents
          .executeJavaScript('localStorage.getItem("user");', true)
          .then(result => {
            store.set('user',JSON.parse(result)) ;
          });
          if(store.get('user')){
            pathWatchDirectory = dialog
            .showOpenDialogSync(mainWindow,{ 
              properties: ['openDirectory'] ,
              title: 'Sync directory'
            });
            if(pathWatchDirectory) {
              store.set('sync.path', pathWatchDirectory[0].replace(/\\/g, '/'))
            }
          }

          
          
        }
      },
      {
        label: 'Start',
        click: () => syncFunction()
      },
      {
        label: 'Stop',
        click: () => {
          if(watcher) watcher.close();
          if(haveInternet) window.clearInterval(haveInternet);
          store.set('sync.start', false);
        }
      }
    ]
  } 
]

const showNotification = (event, path) => {
  let title;
  const body = `File: ${path}`
  if(event == 'SYNC') {
    title = 'Sync file'
  }
  else if(event == 'REMOVE_FILE'){
    title = 'Remove file'
  }
  const notification = {
    title:title,
    body:body,
    silent: true
  }
  if(title && Notification.isSupported()) new Notification(notification).show()
  
}
const statusNotification = (title, body) => {
  const notification = {
    title:title,
    body:body,
    silent: true
  }
  if(title && Notification.isSupported()) new Notification(notification).show()
}
const askInternet = async () =>{
  if(await isOnline()){
    syncFunction();
  }
}
const syncFunction = async () => {
  console.log('start')
  const internet = await isOnline();
  if(store.get('user') && store.get('sync') && internet){
    store.set('sync.start', true);
    if(haveInternet) window.clearInterval(haveInternet);
    watcher = await sync(
      store.get('sync').path,
      async function (eventType, pathChanged) {
        const realPath = pathChanged.replace(store.get('sync').path+'/', '');
        
        syncFile(eventType, pathChanged,realPath)
        .then(res => {
          showNotification(eventType, realPath);
        })
        .catch(error => {

        });
      },
      function (error) {
        console.log(error);
        
      },
      `../home/users/${store.get('user')._id}`, // ../home/users/_id
      3030,
      'nass2.bucaramanga.upb.edu.co'//'207.248.81.164'
    );
  }
  else if(!internet && store.get('sync')?.path){
    statusNotification('Error connection', 'No internet');
    if(store.get('sync')?.start){
      haveInternet = setInterval(askInternet(),60000);
    }
    
  }
  else if(!store.get('sync')?.path){
    statusNotification('Sync directory', 'No directory select')
  }

  
}
const menuBar = Menu.buildFromTemplate(menuBarTemplate);
const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);



function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || 
  url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: tryIcon,
    backgroundColor: '#2e2c29',
    webPreferences: {
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
    },
  });
//   mainWindow.loadURL(startUrl);
mainWindow.loadURL('http://nass.bucaramanga.upb.edu.co/login');
mainWindow.setMenu(menuBar);
  // mainWindow.on('closed', function () {
  //   mainWindow = null;
  // });
  mainWindow.on('close', (event) => {

    if (app.quitting || !store.get('user')) {
      mainWindow = null

    } else {
      event.preventDefault();
      mainWindow.hide();
      tray = new Tray(tryIcon);
      tray.setContextMenu(trayMenu);
      tray.setToolTip('JFLS');
      
    }
  });
  mainWindow.webContents
  .executeJavaScript('localStorage.getItem("user");', true)
  .then(result => {
    store.set('user',JSON.parse(result));
    if(store.get('sync')?.start){
      syncFunction()
    }
  })
  .catch((error) => {
    store.delete('user');
    store.delete('sync')
  });
  
  
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




app.on('before-quit', () => app.quitting = true)
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }else {
    mainWindow.show()
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, { 
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});



const syncFile = async (eventType, pathChanged, filePath) => {
  if(eventType == 'SYNC' && store.get('user')) {
    const file = fs.statSync(pathChanged)
    const opt = {
      method:'POST',
      url:'http://nass2.bucaramanga.upb.edu.co/api/file/sync',//'http://localhost:8080/api/file/sync'
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${store.get('user').access_token}`
      },
      data:{
        name: path.basename(filePath),
        url: filePath.substring(0, filePath.lastIndexOf("/")),
        size: file.size
      }
    }
    
    return axios(
          opt
      )
  }
  else if(eventType == 'REMOVE_FILE' && store.get('user')){
    const opt = {
      method:'DELETE',
      url: 'http://nass2.bucaramanga.upb.edu.co/api/file/sync',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${store.get('user').access_token}`
      },
      data:{
        name: path.basename(filePath),
        url: filePath.substring(0, filePath.lastIndexOf("/")),
      }
    }
    return axios(
      opt
  )
  }
}


