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
const Ready = require('@serialport/parser-ready');

// * IPC

let port: any; // TODO: convert to class
const portParser = new Readline({ delimiter: '\r\n' });

ipcMain.handle('serialport', async (event, data) => {
  // console.log('ipc-serialport -> event', event); // verbose!
  console.log('ipc-serialport.handle -> data', data);

  // create new serialport connector
  const { action, payload } = data;

  switch (action) {
    case 'list':
      return SerialPort.list();
    case 'open':
      const { port: openPort } = payload;
      let openError;
      port = new SerialPort(
        openPort,
        {
          baudRate: 250000,
        },
        (err: any) => {
          err && console.log('ERROR', err);
          openError = err;
        }
      );

      const parser = port.pipe(new Ready({ delimiter: 'READY' }));
      parser.on('ready', () =>
        console.log('the ready byte sequence has been received')
      );
      parser.on('data', console.log); // all data after READY is received

      if (openError) {
        return { status: 'error', error: openError };
      } else {
        console.log('PORT OPENED');
        return { status: 'success', info: 'port opened' };
      }
    case 'close':
      console.log('CLOSING PORT');
      return port.close();
    case 'isOpen':
      return port?.isOpen ? port.isOpen() : false;
    case 'write':
      const { message } = payload;
      port.write(message);
      const writeResponse = port.read();
      console.log('writeResponse', writeResponse);
      return { writeResponse };
    case 'override':
      return port;
    case 'flush':
      console.log('FLUSHING PORT');
      return port.flush();
    case 'drain':
      console.log('DRAINING PORT');
      return port.drain();
    case 'pause':
      console.log('PAUSING PORT');
      return port.pause();
    case 'resume':
      console.log('RESUMING PORT');
      return port.resume();
    default:
      console.log('NO CASE SWITCH METHOD EXISTS FOR', action);
  }
});

// Main Window

let mainWindow: Electron.BrowserWindow | null;

async function createWindow(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    await installExtension(REACT_DEVELOPER_TOOLS)
      .then((name: string) => console.log(`Added Extension: ${name}`))
      .catch((err: PromiseRejectionEvent) =>
        console.log('An error occurred: ', err)
      );
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 700,
    width: 1000,
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
