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
      ).arraySync()
    ).toIncludeSameMembers([
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
    ]);
  });
});
