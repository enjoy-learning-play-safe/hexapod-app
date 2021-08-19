import { rotationSimple } from './rotationSimple';
import { toRadians } from './toRadians';

describe('#rotationSimple', () => {
  test('should return an identity matrix', () => {
    expect(rotationSimple(0, 0, 0)).toIncludeSameMembers([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });
  test('should return a expected rotated matrix for 30deg', () => {
    expect(
      rotationSimple(toRadians(30), toRadians(30), toRadians(30))
    ).toIncludeSameMembers([
      [0.75, -0.21650635094611, 0.625],
      [0.433012701892219, 0.875, -0.21650635094611],
      [-0.5, 0.433012701892219, 0.75],
    ]);
  });
  test('should return a expected rotated matrix for 10deg, 20deg, 30deg', () => {
    expect(
      rotationSimple(toRadians(10), toRadians(20), toRadians(30))
    ).toIncludeSameMembers([
      [0.813797681349374, -0.440969610529882, 0.378522306369792],
      [0.469846310392954, 0.882564119259386, 0.0180283112362973],
      [-0.342020143325669, 0.163175911166535, 0.925416578398323],
    ]);
  });
});
