import roundTo from 'round-to';
import { toRadians } from './../formulae/toRadians';

export const constants = {
  baseRadius: 125,
  platformRadius: 75,
  fixedRodsLength: 210,
  actuatorMin: 0,
  actuatorMax: 300,
  actuatorHome: 150, // (max - min) / 2
  maxChangePerSlice: 1,
  minimumSlicePerMovement: 10,
  delayDuration: 120,
};

export const platformAnglesTestData = [
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
];

export const newAxesTestData = {
  x: 0,
  y: 0,
  z: 10,
  roll: toRadians(0),
  pitch: toRadians(0),
  yaw: toRadians(0),
};

export const newAxesTestData30 = {
  x: 30,
  y: 30,
  z: 30,
  roll: toRadians(30),
  pitch: toRadians(30),
  yaw: toRadians(30),
};

export const previousInputTestData = [
  0,
  0,
  0,
  toRadians(0),
  toRadians(0),
  toRadians(0),
];

export const platformCoordsXYTestData = [
  platformAnglesTestData.map((e) =>
    roundTo(Math.cos(e) * constants.platformRadius, 12)
  ),
  platformAnglesTestData.map((e) =>
    roundTo(Math.sin(e) * constants.platformRadius, 12)
  ),
];

export const platformCoordsBasisTestData = [
  ...platformCoordsXYTestData,
  new Array(6).fill(0),
];

``;
export const b_leg2xTestData = platformCoordsXYTestData[0][1];
export const b_leg3xTestData = platformCoordsXYTestData[0][2];
export const b_leg23yTestData =
  (constants.baseRadius ** 2 - b_leg2xTestData ** 2) ** 0.5;

export const l2aTestData = Math.atan2(b_leg23yTestData, b_leg2xTestData);
export const l3aTestData = Math.atan2(b_leg23yTestData, b_leg3xTestData);

export const baseAnglesTestData = [
  l3aTestData + (4 * Math.PI) / 3,
  l2aTestData,
  l3aTestData,
  l2aTestData + (2 * Math.PI) / 3,
  l3aTestData + (2 * Math.PI) / 3,
  l2aTestData + (4 * Math.PI) / 3,
];

export const baseCoordsTestData = [
  baseAnglesTestData.map((e) => Math.cos(e) * constants.baseRadius),
  baseAnglesTestData.map((e) => Math.sin(e) * constants.baseRadius),
];

export const homeHeightTestData =
  Math.abs(
    constants.fixedRodsLength ** 2 -
      (baseCoordsTestData[0][0] - platformCoordsXYTestData[0][0]) ** 2 -
      (baseCoordsTestData[1][0] - platformCoordsXYTestData[1][0]) ** 2
  ) **
    0.5 +
  constants.actuatorHome;

export const platformCoordsHomeTestData = [
  ...platformCoordsXYTestData,
  new Array(6).fill(homeHeightTestData),
];

export const platformCoordsTestData = [
  ...platformCoordsXYTestData,
  new Array(6).fill(homeHeightTestData + 10),
];
