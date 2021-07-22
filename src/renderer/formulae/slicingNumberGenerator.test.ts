import * as tf from '@tensorflow/tfjs';

import { toRadians } from './toRadians';
import {
  baseCoordsTestData,
  constants,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  platformCoordsTestData,
} from './../fixtures/testFixtures';
import { slicingNumberGenerator } from './slicingNumberGenerator';
import { rotationSimple } from './rotationSimple';

describe('#slicingNumberGeneratir', () => {
  test('z 20 should return 20 as the slicing number', async () => {
    expect(
      await slicingNumberGenerator(
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
  test('z 5 should return 10 as the slicing number', async () => {
    expect(
      await slicingNumberGenerator(
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

  test('everything 30 should return 86', async () => {
    const rotation = tf.matMul(
      rotationSimple(toRadians(30), toRadians(30), toRadians(30)),
      platformCoordsBasisTestData
    );
    expect(
      await slicingNumberGenerator(
        platformCoordsHomeTestData,
        tf
          .stack([
            rotation.gather(0).add(30),
            rotation.gather(1).add(30),
            rotation.gather(2).add(30),
          ])
          .sub(platformCoordsBasisTestData)
          .add(platformCoordsHomeTestData),
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(86);
  });

  test('everything 20 should return ?', async () => {
    const rotation = tf.matMul(
      rotationSimple(toRadians(20), toRadians(20), toRadians(20)),
      platformCoordsBasisTestData
    );
    expect(
      await slicingNumberGenerator(
        platformCoordsHomeTestData,
        tf
          .stack([
            rotation.gather(0).add(20),
            rotation.gather(1).add(20),
            rotation.gather(2).add(20),
          ])
          .sub(platformCoordsBasisTestData)
          .add(platformCoordsHomeTestData),
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      )
    ).toEqual(55);
  });
});
