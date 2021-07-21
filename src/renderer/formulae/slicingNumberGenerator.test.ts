import {
  baseCoordsTestData,
  constants,
  platformCoordsHomeTestData,
} from './../fixtures/testFixtures';
import { slicingNumberGenerator } from './slicingNumberGenerator';

describe('#slicingNumberGeneratir', () => {
  test('z 20 should return 20 as the slicing number', () => {
    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        platformCoordsHomeTestData.add([
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [20, 20, 20, 20, 20, 20],
        ]),
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(20);
  });
  test('z 5 should return 10 as the slicing number', () => {
    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        platformCoordsHomeTestData.add([
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [5, 5, 5, 5, 5, 5],
        ]),
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(10);
  });
});
