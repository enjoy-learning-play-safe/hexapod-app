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

      platformCoords: [
        [
          104.99373626708984, 66.90875244140625, -8.084980010986328,
          -44.993736267089844, -6.90875244140625, 68.08496856689453,
        ],
        [
          30.68535041809082, 95.28921508789062, 94.6038589477539,
          29.31464195251465, -35.289215087890625, -34.60386657714844,
        ],
        [
          382.175537109375, 383.11175537109375, 383.797119140625,
          383.5462646484375, 382.61004638671875, 381.9246826171875,
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
      previousInput: [
        30, 30, 30, 0.5235987901687622, 0.5235987901687622, 0.5235987901687622,
      ],
    });
  });
});
