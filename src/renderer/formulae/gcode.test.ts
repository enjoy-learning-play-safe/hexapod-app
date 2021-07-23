/**
 * @jest-environment jsdom
 */

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
  test('should generate gcode for z +10', async () => {
    window.electron = {
      ipcRenderer: {
        invoke: jest.fn().mockImplementation(() => true),
      },
    };

    const gcodeRes = await gcode(
      platformCoordsTestData,
      newAxesTestData,
      previousInputTestData,
      platformCoordsBasisTestData,
      platformCoordsHomeTestData,
      constants.fixedRodsLength,
      baseCoordsTestData,
      constants.maxChangePerSlice,
      constants.minimumSlicePerMovement,
      constants.delayDuration
    );

    expect({
      ...gcodeRes,
      platformCoords: gcodeRes.platformCoords.arraySync(),
      platformCoordsBasis: gcodeRes.platformCoordsBasis.arraySync(),
      previousInput: gcodeRes.previousInput.arraySync(),
    }).toEqual({
      gcodeString: 'G0 X160 Y160 Z160 A160 B160 C160',
      platformCoords: [
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
      platformCoordsBasis: [
        [
          75, 37.499996185302734, -37.500003814697266, -75, -37.49999237060547,
          37.49999237060547,
        ],
        [
          0, 64.95191192626953, 64.951904296875, -0.0000065567082856432535,
          -64.95191192626953, -64.95191192626953,
        ],
        [0, 0, 0, 0, 0, 0],
      ],
      previousInput: [0, 0, 10, 0, 0, 0],
    });
  });

  test('should generate gcode for changing all axes +30', async () => {
    window.electron = {
      ipcRenderer: {
        invoke: jest.fn().mockImplementation(() => true),
      },
    };

    const gcodeRes = await gcode(
      platformCoordsTestData,
      newAxesTestData30,
      previousInputTestData,
      platformCoordsBasisTestData,
      platformCoordsHomeTestData,
      constants.fixedRodsLength,
      baseCoordsTestData,
      constants.maxChangePerSlice,
      constants.minimumSlicePerMovement,
      constants.delayDuration
    );

    expect({
      ...gcodeRes,
      platformCoords: gcodeRes.platformCoords.arraySync(),
      platformCoordsBasis: gcodeRes.platformCoordsBasis.arraySync(),
      previousInput: gcodeRes.previousInput.arraySync(),
    }).toEqual({
      gcodeString: 'G0 X158.843 Y182.962 Z227.023 A235.104 B195.707 C142.84',

      platformCoordsBasis: [
        [
          75, 37.499996185302734, -37.500003814697266, -75, -37.49999237060547,
          37.49999237060547,
        ],
        [
          0, 64.95191192626953, 64.951904296875, -0.0000065567082856432535,
          -64.95191192626953, -64.95191192626953,
        ],
        [0, 0, 0, 0, 0, 0],
      ],
      previousInput: [
        30, 30, 30, 0.5235987901687622, 0.5235987901687622, 0.5235987901687622,
      ],
    });
  });
});
