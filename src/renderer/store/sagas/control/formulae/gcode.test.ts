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
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [
          0, 64.951905283833, 64.951905283833, 0, -64.951905283833,
          -64.951905283833,
        ],
        [
          362.8608936297042, 362.8608936297042, 362.8608936297042,
          362.8608936297042, 362.8608936297042, 362.8608936297042,
        ],
      ],
      platformCoordsBasis: [
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [
          0, 64.951905283833, 64.951905283833, 0, -64.951905283833,
          -64.951905283833,
        ],
        [0, 0, 0, 0, 0, 0],
      ],
      previousInput: [0, 0, 10, 0, 0, 0],
    });
  });
});
