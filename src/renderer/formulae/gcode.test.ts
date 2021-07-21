import {
  newAxesTestData,
  platformCoordsTestData,
  previousInputTestData,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  constants,
  baseCoordsTestData,
} from './../fixtures/testFixtures';
import { gcode } from './gcode';

describe('#gcode', () => {
  test('should return expected newPlatformCoords', () => {
    expect(
      gcode(
        platformCoordsTestData,
        newAxesTestData,
        previousInputTestData,
        platformCoordsBasisTestData,
        platformCoordsHomeTestData,
        constants.fixedRodsLength,
        baseCoordsTestData
      )
    ).toEqual({});
  });
});
