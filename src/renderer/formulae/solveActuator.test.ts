import {
  baseCoordsTestData,
  constants,
  platformCoordsTestData,
} from './../fixtures/testFixtures';
import { solveActuator } from './solveActuator';

describe('#solveActuator', () => {
  test('should return expected 1d tensor', async () => {
    expect(
      (
        await solveActuator(
          platformCoordsTestData,
          constants.fixedRodsLength,
          baseCoordsTestData,
          3
        )
      ).arraySync()
    ).toIncludeSameMembers([160, 160, 160, 160, 160, 160]);
  });
});
