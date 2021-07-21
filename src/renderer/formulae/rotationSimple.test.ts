import { rotationSimple } from './rotationSimple';

describe('#rotationSimple', () => {
  test('should return a expected rotated matrix', () => {
    expect(rotationSimple(10, 10, 10).arraySync()).toIncludeSameMembers([
      // [0.7040410041809082, -0.7048033475875854, -0.08705421537160873],
      // [0.45647263526916504, 0.5430331230163574, -0.7048033475875854],
      // [0.5440211296081543, 0.45647263526916504, 0.7040410041809082],
    ]);
  });
});
