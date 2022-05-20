/* eslint-disable no-console */
console.log('hello, i am preload.ts (hopefully transpiled!)');

// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');

console.log('ELECTRON: running preload.js');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: async (channel: string, ...args: any) =>
      await ipcRenderer.invoke(channel, ...args),
    send: (channel: string, ...args: any) => ipcRenderer.send(channel, ...args),
    postMessage: (channel: string, args: any) =>
      ipcRenderer.postMessage(channel, args),
    on: (
      channel: string,
      handler: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ) => ipcRenderer.on(channel, handler),
    once: (
      channel: string,
      handler: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ) => ipcRenderer.once(channel, handler),
  },
});

console.log('ELECTRON: preload.js finished');

export {}; // make this a module, without exporting anything, to satisfy typescript
