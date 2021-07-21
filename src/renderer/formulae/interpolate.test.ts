import {
  constants,
  newAxesTestData,
  previousInputTestData,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  baseCoordsTestData,
  newAxesTestData30,
} from './../fixtures/testFixtures';
import { interpolate } from './interpolate';

describe('#interpolate', () => {
  describe('interpolate()', () => {
    test('from home to z = +10', () => {
      const interpolated = interpolate(
        newAxesTestData,
        previousInputTestData,
        2,
        platformCoordsBasisTestData,
        platformCoordsHomeTestData,
        constants.fixedRodsLength,
        baseCoordsTestData,
        3
      );

      expect(interpolated).toEqual({
        finalValue: {
          gcodeString: 'G0 X160 Y160 Z160 A160 B160 C160',
        },
      });
    });

    test('from home to all axes +30', () => {
      const interpolated = interpolate(
        newAxesTestData30,
        previousInputTestData,
        2,
        platformCoordsBasisTestData,
        platformCoordsHomeTestData,
        constants.fixedRodsLength,
        baseCoordsTestData,
        3
      );

      expect(interpolated).toEqual({
        finalValue: {
          gcodeString:
            'G0 X158.843 Y182.962 Z227.023 A235.104 B195.707 C142.84',
        },
      });
    });
  });
});
