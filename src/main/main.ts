/**
 * Entry point of the Election app.
 */
import * as path from 'path';
import * as url from 'url';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, ipcMain } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const Ready = require('@serialport/parser-ready');

let mainWindow: Electron.BrowserWindow | null;

// * IPC

let port: any;

// let port: any = {
//   on: () => {},
//   pipe: () => {},
// }; // TODO: convert to class

// let port = new SerialPort('/dev/tty.usbserial-142310', {
//   baudRate: 250000,
// });

console.log('reporting in from main.ts');

// const portParser = new Readline({ delimiter: '\r\n' });
// const portParser = new Readline();
// port.pipe(portParser);

// portParser.once('data', (data: any) => {
//   console.log('portParserData', data);
// });

// The open event is always emitted
// port.once('open', function () {
//   // open logic
//   console.log('Port is open');
// });

// port.on('readable', function () {
//   console.log('ReadableData:', port.read());
// });

// port.on('data', function (data: any) {
//   console.log('Data:', data);
// });

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

      // const portClosed = isPortClosed(port)
      // if (portClosed) return portClosed

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

      const portParser = port.pipe(new Readline());

      // add event emitter subscription here:
      portParser.on('data', (data: any) => {
        console.log('portParserData', data);
        mainWindow?.webContents.send('serialport-listen', data);
      });

      if (openError) {
        return { status: 'error', error: openError };
      } else {
        console.log('PORT OPENED');
        return { status: 'success', info: 'port opened' };
      }
    case 'close':
      console.log('CLOSING PORT');
      const portClosed2 = isPortClosed(port);
      if (portClosed2) return portClosed2;
      return port.close();
    case 'isOpen':
      const portClosed3 = isPortClosed(port);
      if (portClosed3) return portClosed3;
      return port?.isOpen ? port.isOpen() : false;
    case 'write':
      const { message } = payload;

      const portClosed4 = isPortClosed(port);
      if (portClosed4) return portClosed4;

      port.write(message);
      const writeResponse = port.read();
      console.log('writeResponse', writeResponse);
      return { writeResponse };
    case 'override':
      // return port;
      const portObjKeys = Object.keys(port);
      return portObjKeys;

    case 'flush':
      console.log('FLUSHING PORT');
      const portClosed5 = isPortClosed(port);
      if (portClosed5) return portClosed5;
      return port.flush();
    case 'drain':
      console.log('DRAINING PORT');
      const portClosed6 = isPortClosed(port);
      if (portClosed6) return portClosed6;
      return port.drain();
    case 'pause':
      console.log('PAUSING PORT');
      const portClosed7 = isPortClosed(port);
      if (portClosed7) return portClosed7;
      return port.pause();
    case 'resume':
      console.log('RESUMING PORT');
      const portClosed8 = isPortClosed(port);
      if (portClosed8) return portClosed8;
      return port.resume();
    default:
      console.log('NO CASE SWITCH METHOD EXISTS FOR', action);
  }
});

const isPortClosed = (port: any) => {
  if (!port) {
    return { status: 'error', error: 'no open port was found' };
  }
  return false;
};

// Main Window

async function createWindow(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
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
