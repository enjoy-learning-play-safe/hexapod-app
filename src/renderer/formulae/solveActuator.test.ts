import {
  baseCoordsTestData,
  constants,
  platformCoordsTestData,
} from './../fixtures/testFixtures';
import { solveActuator } from './solveActuator';

describe('#solveActuator', () => {
  test('should return expected 1d tensor', () => {
    // expect(true).toBeTruthy();
    expect(
      solveActuator(
        platformCoordsTestData,
        constants.fixedRodsLength,
        baseCoordsTestData,
        3
      ).arraySync()
    ).toIncludeSameMembers([160, 160, 160, 160, 160, 160]);
  });
});
