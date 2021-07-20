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
      [175, 137.5, 62.499996185302734, 25, 62.50000762939453, 137.5],
      [
        100, 164.951904296875, 164.951904296875, 99.99999237060547,
        35.04808807373047, 35.04808807373047,
      ],
      [
        -252.86090087890625, -252.86090087890625, -252.86090087890625,
        -252.86090087890625, -252.86090087890625, -252.86090087890625,
      ],
    ]);
  });
});
