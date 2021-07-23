import * as tf from '@tensorflow/tfjs';
import { rotationSimple } from './rotationSimple';
import { toRadians } from './toRadians';

describe('#rotationSimple', () => {
  test('should return an identity matrix', () => {
    expect(rotationSimple(0, 0, 0).arraySync()).toIncludeSameMembers([
      [1, 0, 0],
      [0, 1, 0],
      [-0, 0, 1],
    ]);
  });
  test('should return a expected rotated matrix for 30deg', () => {
    expect(
      rotationSimple(toRadians(30), toRadians(30), toRadians(30)).arraySync()
    ).toIncludeSameMembers([
      [0.75, -0.21650634706020355, 0.625],
      [0.4330126941204071, 0.875, -0.21650634706020355],
      [-0.5, 0.4330126941204071, 0.75],
    ]);
  });
  test('should return a expected rotated matrix for 10deg, 20deg, 30deg', () => {
    expect(
      rotationSimple(toRadians(10), toRadians(20), toRadians(30)).arraySync()
    ).toIncludeSameMembers([
      [0.813797652721405, -0.4409696161746979, 0.3785223066806793],
      [0.46984630823135376, 0.882564127445221, 0.01802831143140793],
      [-0.3420201539993286, 0.16317591071128845, 0.9254165887832642],
    ]);
  });
});
