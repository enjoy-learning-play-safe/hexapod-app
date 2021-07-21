import {
  newAxesTestData,
  platformCoordsTestData,
  previousInputTestData,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  constants,
  baseCoordsTestData,
  newAxesTestData30,
} from './../fixtures/testFixtures';
import { gcode } from './gcode';

describe('#gcode', () => {
  test('should generate gcode for z +10', () => {
    const gcodeRes = gcode(
      platformCoordsTestData,
      newAxesTestData,
      previousInputTestData,
      platformCoordsBasisTestData,
      platformCoordsHomeTestData,
      constants.fixedRodsLength,
      baseCoordsTestData,
      constants.maxChangePerSlice,
      constants.minimumSlicePerMovement
    );

    expect({
      ...gcodeRes,
      newPlatformCoords: gcodeRes.newPlatformCoords.arraySync(),
    }).toEqual({
      gcodeString: 'G0 X160 Y160 Z160 A160 B160 C160',
      newPlatformCoords: [
        [
          75, 37.499996185302734, -37.500003814697266, -75, -37.49999237060547,
          37.49999237060547,
        ],
        [
          0, 64.95191192626953, 64.951904296875, -0.0000065567082856432535,
          -64.95191192626953, -64.95191192626953,
        ],
        [
          362.86090087890625, 362.86090087890625, 362.86090087890625,
          362.86090087890625, 362.86090087890625, 362.86090087890625,
        ],
      ],
    });
  });

  test('should generate gcode for changing all axes +30', () => {
    const gcodeRes = gcode(
      platformCoordsTestData,
      newAxesTestData30,
      previousInputTestData,
      platformCoordsBasisTestData,
      platformCoordsHomeTestData,
      constants.fixedRodsLength,
      baseCoordsTestData,
      constants.maxChangePerSlice,
      constants.minimumSlicePerMovement
    );

    expect({
      ...gcodeRes,
      newPlatformCoords: gcodeRes.newPlatformCoords.arraySync(),
    }).toEqual({
      gcodeString: 'G0 X158.843 Y182.962 Z227.023 A235.104 B195.707 C142.84',
      newPlatformCoords: [
        [
          86.25, 44.062496185302734, -12.187503814697266, -26.25,
          15.937507629394531, 72.1875,
        ],
        [
          62.4759521484375, 103.0708999633789, 70.59494018554688,
          -2.4759559631347656, -43.070892333984375, -10.594951629638672,
        ],
        [
          345.36090087890625, 392.23590087890625, 429.73590087890625,
          420.36090087890625, 373.48590087890625, 335.98590087890625,
        ],
      ],
    });
  });
});
