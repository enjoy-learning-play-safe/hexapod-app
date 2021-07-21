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
} from './testFixtures';
// * this file is to make sure our text fixtures return expected data, and jeopardize other test suites that depend on these fixtures

import * as tf from '@tensorflow/tfjs';
import {
  platformAnglesTestData,
  newAxesTestData,
  previousInputTestData,
} from './testFixtures';
import roundTo from 'round-to';

describe('#testFixtures', () => {
  describe('platformAngles', () => {
    test('should return expected tensor', () => {
      expect(platformAnglesTestData.arraySync()).toIncludeSameMembers(
        tf
          .tensor1d([
            0,
            Math.PI / 3,
            (2 * Math.PI) / 3,
            Math.PI,
            (4 * Math.PI) / 3,
            (5 * Math.PI) / 3,
          ])
          .arraySync()
      );
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
      expect(previousInputTestData.arraySync()).toIncludeSameMembers([
        0, 0, 0, 0, 0, 0,
      ]);
    });
  });
  describe('platformCoordsXY', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsXYTestData.arraySync()).toIncludeSameMembers([
        [
          75, 37.499996185302734, -37.500003814697266, -75, -37.49999237060547,
          37.49999237060547,
        ],
        [
          0, 64.95191192626953, 64.951904296875, -0.0000065567082856432535,
          -64.95191192626953, -64.95191192626953,
        ],
      ]);
    });
  });
  describe('platformCoordsBasis', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsBasisTestData.arraySync()).toIncludeSameMembers([
        [
          75, 37.499996185302734, -37.500003814697266, -75, -37.49999237060547,
          37.49999237060547,
        ],
        [
          0, 64.95191192626953, 64.951904296875, -0.0000065567082856432535,
          -64.95191192626953, -64.95191192626953,
        ],
        [0, 0, 0, 0, 0, 0],
      ]);
    });
  });

  // todo: add more test for the exported stuff here

  describe('baseAngles', () => {
    describe('intermediate values', () => {
      test('b_leg2x', () => {
        expect(b_leg2xTestData).toEqual(37.499996185302734);
      });
      test('b_leg3x', () => {
        expect(b_leg3xTestData).toEqual(-37.500003814697266);
      });
      test('b_leg23y', () => {
        expect(b_leg23yTestData).toEqual(119.24240137678493);
      });
      test('l2a', () => {
        expect(l2aTestData).toEqual(1.2661037047706134);
      });
      test('l3a', () => {
        expect(l3aTestData).toEqual(1.8754890070430077);
      });
    });

    test('should return expected tensor', () => {
      expect(baseAnglesTestData.arraySync()).toIncludeSameMembers([
        6.064279079437256, 1.266103744506836, 1.8754889965057373,
        3.3604989051818848, 3.969884157180786, 5.454894065856934,
      ]);
    });
  });

  describe('baseCoords', () => {
    test('should return expected tensor', () => {
      //todo
      expect(
        baseCoordsTestData
          .arraySync()
          .map((arr) => arr.map((ele) => roundTo(ele, 2)))
      ).toIncludeSameMembers([
        [122.02, 37.5, -37.5, -122.02, -84.52, 84.52],
        [-27.15, 119.24, 119.24, -27.15, -92.1, -92.1],
      ]);
    });
  });

  describe('homeHeight', () => {
    test('should return expected tensor', () => {
      expect(homeHeightTestData).toEqual(352.86089238044957); // ! isn't this supposed to be under 300?
    });
  });

  describe('platformCoordsHome', () => {
    test('should return expected tensor', () => {
      expect(
        platformCoordsHomeTestData
          .arraySync()
          .map((arr) => arr.map((ele) => roundTo(ele, 2)))
      ).toIncludeSameMembers([
        [75, 37.5, -37.5, -75, -37.5, 37.5],
        [0, 64.95, 64.95, -0, -64.95, -64.95],
        [352.86, 352.86, 352.86, 352.86, 352.86, 352.86],
      ]);
    });
  });

  describe('platformCoords', () => {
    test('should return expected tensor', () => {
      expect(platformCoordsTestData.arraySync()).toIncludeSameMembers([
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
});
