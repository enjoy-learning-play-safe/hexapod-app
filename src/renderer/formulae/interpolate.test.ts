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
          gcodeString:
            'G0 X-454.1590576171875 Y-429.5276184082031 Z-429.5276184082031 A-520.3771362304688 B-520.3770751953125 C-454.1590270996094',
        },
      });
    });
  });
});
