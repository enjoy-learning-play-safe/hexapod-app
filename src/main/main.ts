/**
 * Entry point of the Election app.
 */
import * as path from 'path';
import * as url from 'url';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// * IPC

let port: any; // TODO: convert to class
const portParser = new Readline({ delimiter: '\r\n' });

ipcMain.handle('serialport', async (event, data) => {
  // console.log('ipc-serialport -> event', event); // verbose!
  console.log('ipc-serialport -> data', data);

  // create new serialport connector
  const { action, payload } = data;

  switch (action) {
    case 'list':
      return await SerialPort.list();
    case 'isOpen':
      return { isOpen: port.isOpen };
    case 'open':
      const { port: devPort, baudRate = 250000 } = payload;
      // port && port.close(); // close any existing port before opening a new one
      port = new SerialPort(devPort, {
        baudRate,
      });
      const response = port.read();
      console.log('response'), response;
      return { status: 'success', response };

    case 'update': // change baudrate of port
      const { baudRate: br } = payload;
      port.update({ baudRate: br });
      return { status: 'success' };
    case 'set': // change options of an open port
      port.set(payload);
      return { status: 'success' };
    case 'get': // change options of an open port
      let getResponse;
      return await new Promise(function (resolve, reject) {
        port.get((err: any, data: any) => {
          getResponse = { err, data };
          console.log('main.ts -> get -> ', { err, data });
          console.log('main.ts -> get -> ', getResponse);
        });
      });
      return { status: 'success', response: getResponse };

    case 'write':
      const { message } = payload;
      if (port) {
        const writeResponse = await new Promise(function (resolve, reject) {
          port.write('G0\n', function () {
            console.log('message written');
            portParser.on('data', (data: any) => {
              console.log(data);
              resolve(data);
            });
          });
        });
        return { status: 'success', response: writeResponse };
      } else {
        return { status: 'failed', error: 'ERROR: No port connected' };
      }
    case 'flush':
      port.flush((err: any) => {
        return { status: 'error', error: err };
      });
      return { status: 'success' };
    case 'drain':
      port.flush((err: any) => {
        return { status: 'error', error: err };
      });
      return { status: 'success' };
    case 'close': // ! NOT WORKING
      port.close((err: any) => {
        return { status: 'failed', error: err };
      });
      return { status: 'success', info: 'Port closed successfully' };
    case 'pause':
      port.pause();
      return { status: 'success', info: 'paused' };
    case 'resume':
      port.resume();
      return { status: 'success', info: 'resumed' };
    default:
      return 'unknown action was passed to the ipc handler method';
  }
});

// Main Window

let mainWindow: Electron.BrowserWindow | null;

async function createWindow(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    await installExtension(REACT_DEVELOPER_TOOLS)
      .then((name: string) => console.log(`Added Extension:  ${name}`))
      .catch((err: PromiseRejectionEvent) =>
        console.log('An error occurred: ', err)
      );
  }

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
