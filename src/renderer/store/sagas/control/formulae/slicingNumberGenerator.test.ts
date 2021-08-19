import { toRadians } from './toRadians';
import {
  baseCoordsTestData,
  homeHeightTestData,
  constants,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  platformCoordsTestData,
} from '../../../../fixtures/testFixtures';
import { slicingNumberGenerator } from './slicingNumberGenerator';
import { rotationSimple } from './rotationSimple';
import matMul from './matMul';

describe('#slicingNumberGenerator', () => {
  test('z 20 should return 20 as the slicing number', () => {
    const endPose = [
      ...platformCoordsHomeTestData.slice(0, 2),
      platformCoordsHomeTestData[2].map((e) => e + 20),
    ];

    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        endPose,
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(20);
  });
  test('z 5 should return 10 as the slicing number', () => {
    const endPose = [
      ...platformCoordsHomeTestData.slice(0, 2),
      platformCoordsHomeTestData[2].map((e) => e + 5),
    ];
    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        endPose,
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(10);
  });

  test('everything 30 should return 86', () => {
    const rotation = matMul(
      rotationSimple(toRadians(30), toRadians(30), toRadians(30)),
      platformCoordsBasisTestData
    );

    const endPose = rotation
      .map((row) => row.map((e) => e + 30))
      .map((row, index) =>
        index == 2 ? row.map((e) => e + homeHeightTestData) : row
      );

    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        endPose,
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(86);
  });

  test('everything 20 should return ?', () => {
    const rotation = matMul(
      rotationSimple(toRadians(20), toRadians(20), toRadians(20)),
      platformCoordsBasisTestData
    );

    const endPose = rotation
      .map((row) => row.map((e) => e + 30))
      .map((row, index) =>
        index == 2 ? row.map((e) => e + homeHeightTestData) : row
      );

    expect(
      slicingNumberGenerator(
        platformCoordsHomeTestData,
        endPose,
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(70); // ? is this correct ?
  });
  0;
});
