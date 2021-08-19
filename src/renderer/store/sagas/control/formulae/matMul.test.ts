import matMul from './matMul';

describe('#matMul', () => {
  test('case 1', () => {
    const matA = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ];

    const matB = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6],
    ];

    const multipled = matMul(matA, matB);
    expect(multipled).toIncludeSameMembers([
      [6, 12, 18, 24, 30, 36],
      [6, 12, 18, 24, 30, 36],
      [6, 12, 18, 24, 30, 36],
    ]);
  });
  test('case 2', () => {
    const matA = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const matB = [
      [6, 12, 18, 24, 30, 36],
      [6, 12, 18, 24, 30, 36],
      [6, 12, 18, 24, 30, 36],
    ];

    const multipled = matMul(matA, matB);
    expect(multipled).toIncludeSameMembers([
      [36, 72, 108, 144, 180, 216],
      [90, 180, 270, 360, 450, 540],
      [144, 288, 432, 576, 720, 864],
    ]);
  });
});
