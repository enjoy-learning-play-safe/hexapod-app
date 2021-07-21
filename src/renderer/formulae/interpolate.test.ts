import {
  constants,
  newAxesTestData,
  previousInputTestData,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  baseCoordsTestData,
} from './../fixtures/testFixtures';
import { interpolate } from './interpolate';

describe('#interpolate', () => {
  describe('interpolate()', () => {
    test('test case uno', () => {
      const interpolated = interpolate(
        newAxesTestData,
        previousInputTestData,
        2,
        platformCoordsBasisTestData,
        platformCoordsHomeTestData,
        constants.fixedRodsLength,
        baseCoordsTestData
      );

      expect(interpolated).toEqual({
        finalValue: {
          gcodeString: 'G0 X350 Y350 Z350 A350 B350 C350',
        },
      });
    });
  });
});
