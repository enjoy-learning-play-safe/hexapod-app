// * this file is to make sure our text fixtures return expected data, and jeopardize other test suites that depend on these fixtures

import {
  platformCoordsXYTestData,
  platformCoordsBasisTestData,
  platformCoordsTestData,
  homeHeightTestData,
  b_leg2xTestData,
  b_leg3xTestData,
  b_leg23yTestData,
  l2aTestData,
  l3aTestData,
  baseCoordsTestData,
  platformCoordsHomeTestData,
  baseAnglesTestData,
  platformAnglesTestData,
  newAxesTestData,
  previousInputTestData,
} from './testFixtures';

import roundTo from 'round-to';

describe('#testFixtures', () => {
  describe('platformAngles', () => {
    test('should return expected tensor', () => {
      expect(platformAnglesTestData).toIncludeSameMembers([
        0,
        Math.PI / 3,
        (2 * Math.PI) / 3,
        Math.PI,
        (4 * Math.PI) / 3,
        (5 * Math.PI) / 3,
      ]);
    });
  });

  describe('newAxes', () => {
    test('should return expected tensor', () => {
      expect(newAxesTestData).toEqual({
        x: 0,
        y: 0,
        z: 10,
        roll: 0,
        pitch: 0,
        yaw: 0,
      });
    });
  });

  describe('previousInput', () => {
    test('should return expected tensor', () => {
      expect(previousInputTestData).toIncludeSameMembers([0, 0, 0, 0, 0, 0]);
    });
  });
  describe('platformCoordsXY', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsXYTestData).toIncludeSameMembers([
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [
          0, 64.951905283833, 64.951905283833, 0, -64.951905283833,
          -64.951905283833,
        ],
      ]);
    });
  });
  describe('platformCoordsBasis', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsBasisTestData).toIncludeSameMembers([
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [
          0, 64.951905283833, 64.951905283833, 0, -64.951905283833,
          -64.951905283833,
        ],
        [0, 0, 0, 0, 0, 0],
      ]);
    });
  });

  // todo: add more test for the exported stuff here

  describe('baseAngles', () => {
    describe('intermediate values', () => {
      test('b_leg2x', () => {
        expect(b_leg2xTestData).toEqual(37.5);
      });
      test('b_leg3x', () => {
        expect(b_leg3xTestData).toEqual(-37.5);
      });
      test('b_leg23y', () => {
        expect(b_leg23yTestData).toEqual(119.2424001771182);
      });
      test('l2a', () => {
        expect(l2aTestData).toEqual(1.266103672779499);
      });
      test('l3a', () => {
        expect(l3aTestData).toEqual(1.8754889808102944);
      });
    });

    test('should return expected tensor', () => {
      expect(baseAnglesTestData).toIncludeSameMembers([
        6.064279185596685, 1.266103672779499, 1.8754889808102944,
        3.3604987751726942, 3.96988408320349, 5.4548938775658895,
      ]);
    });
  });

  describe('baseCoords', () => {
    test('should return expected tensor', () => {
      //todo
      expect(
        baseCoordsTestData.map((arr) => arr.map((ele) => roundTo(ele, 2)))
      ).toIncludeSameMembers([
        [122.02, 37.5, -37.5, -122.02, -84.52, 84.52],
        [-27.15, 119.24, 119.24, -27.15, -92.1, -92.1],
      ]);
    });
  });

  describe('homeHeight', () => {
    test('should return expected tensor', () => {
      expect(homeHeightTestData).toEqual(352.8608936297042);
    });
  });

  describe('platformCoordsHome', () => {
    test('should return expected tensor', () => {
      expect(
        platformCoordsHomeTestData.map((arr) =>
          arr.map((ele) => roundTo(ele, 2))
        )
      ).toIncludeSameMembers([
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [0, 64.95, 64.95, 0, -64.95, -64.95],
        [352.86, 352.86, 352.86, 352.86, 352.86, 352.86],
      ]);
    });
  });

  describe('platformCoords', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsTestData).toIncludeSameMembers([
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [
          0, 64.951905283833, 64.951905283833, 0, -64.951905283833,
          -64.951905283833,
        ],
        [
          362.8608936297042, 362.8608936297042, 362.8608936297042,
          362.8608936297042, 362.8608936297042, 362.8608936297042,
        ],
      ]);
    });
  });
});
