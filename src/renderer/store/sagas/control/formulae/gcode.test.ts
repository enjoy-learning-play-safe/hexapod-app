/**
 * @jest-environment jsdom
 */

import {
  baseCoordsTestData,
  constants,
  newAxesTestData,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  previousInputTestData,
} from '../../../../../renderer/fixtures/testFixtures';
import { gcode } from './gcode';

describe('#gcode', () => {
  test('should generate gcode for z +10', async () => {
    window.electron = {
      ipcRenderer: {
        invoke: jest.fn().mockImplementation(() => true),
      },
    };

    const gcodeRes = await gcode(
      platformCoordsHomeTestData,
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

    expect(gcodeRes).toEqual({
      gcodeString: 'G0 X160 Y160 Z160 A160 B160 C160',
      platformCoords: [
        [
          75, 37.50000000000001, -37.499999999999986, -75, -37.500000000000036,
          37.50000000000001,
        ],
        [
          0, 64.9519052838329, 64.9519052838329, 9.184850993605149e-15,
          -64.95190528383289, -64.9519052838329,
        ],
        [
          362.8608936297042, 362.8608936297042, 362.8608936297042,
          362.8608936297042, 362.8608936297042, 362.8608936297042,
        ],
      ],
      platformCoordsBasis: [
        [
          75, 37.50000000000001, -37.499999999999986, -75, -37.500000000000036,
          37.50000000000001,
        ],
        [
          0, 64.9519052838329, 64.9519052838329, 9.184850993605149e-15,
          -64.95190528383289, -64.9519052838329,
        ],
        [10, 10, 10, 10, 10, 10],
      ],
      previousInput: [0, 0, 10, 0, 0, 0],
    });
  });
});
