export const list = async () =>
  await window.electron.ipcRenderer.invoke('serialport', {
    action: 'list',
  });

export const open = async (port: string) =>
  await window.electron.ipcRenderer.invoke('serialport', {
    action: 'open',
    payload: {
      port,
    },
  });

export const write = async (message: string) =>
  await window.electron.ipcRenderer.invoke('serialport', {
    action: 'write',
    payload: {
      message: `${message}\r\n`,
    },
  });

export const writeRaw = async (message: string) =>
  await window.electron.ipcRenderer.invoke('serialport', {
    action: 'write',
    payload: {
      message,
    },
  });

export const close = async () => {
  // todo
};

export default {
  list,
  open,
  write,
  writeRaw,
};
