/**
 * Entry point of the Election app.
 */
import * as path from 'path';
import * as url from 'url';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, ipcMain } from 'electron';

const SerialPort = require('serialport');

// * IPC

let port: any; // TODO: convert to class

ipcMain.handle('serialport', async (event, data) => {
  // console.log('ipc-serialport -> event', event); // verbose!
  console.log('ipc-serialport -> data', data);

  // create new serialport connector
  const { action, payload } = data;

  switch (action) {
    case 'list':
      return await SerialPort.list();
    //   .filter((device: { vendorId: string }) =>
    //   payload.vendorId ? device.vendorId === payload.vendorId : true
    // );
    case 'open':
      const { port: devPort, baudRate = 57600 } = payload;
      port = new SerialPort(devPort, {
        baudRate,
      });
      return { status: 'success' };
    case 'write':
      port &&
        port.write('main screen turn on', (err: any) => {
          if (err) {
            console.log('Error on write: ', err.message);
            return { status: 'failed' };
          }
          console.log('message written');
        });
      return { status: 'success' };
    default:
      return 'no action was passed to the ipc handlerr';
  }
});

// Main Window

let mainWindow: Electron.BrowserWindow | null;

async function createWindow(): Promise<void> {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: '#1A202C',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 20,
      y: 27,
    },
    frame: false,
    webPreferences: {
      // devTools: process.env.NODE_ENV !== 'production',
      devTools: true,
      preload: path.join(__dirname, './preload.bundle.js'),
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    await mainWindow.loadURL('http://localhost:4000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow
      .loadURL(
        url.format({
          pathname: path.join(__dirname, './index.html'),
          protocol: 'file:',
          slashes: true,
        })
      )
      .finally(() => {
        /* no action */
      });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
