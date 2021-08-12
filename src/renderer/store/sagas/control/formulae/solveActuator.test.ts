import {
  baseCoordsTestData,
  constants,
  platformCoordsTestData,
} from '../../../../fixtures/testFixtures';
import { solveActuator } from './solveActuator';

describe('#solveActuator', () => {
  test('should return expected 1d tensor', () => {
    expect(
      solveActuator(
        platformCoordsTestData,
        constants.fixedRodsLength,
        baseCoordsTestData,
        3
      )
    ).toIncludeSameMembers([160, 160, 160, 160, 160, 160]);
  });
});
