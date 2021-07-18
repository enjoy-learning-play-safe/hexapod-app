import delay from 'delay';
import serial from './serialport';

export const initialize = async () => {
  for (let i = 0; i <= 23; i += 1) {
    await serial.write('G90');
    await delay(150);
  }
};

export const home = async () => {
  await serial.write('G28');
  await delay(150);
  await serial.write('G0 X100 Y100 Z100 A100 B100 C100');
};
