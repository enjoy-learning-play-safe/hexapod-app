import { getValuesFromTensor } from './tensorUtils';
import { tensor1d, tensor2d } from '@tensorflow/tfjs';

describe('#tensorUtils', () => {
  describe('tensorToArray()', () => {
    describe('for a 1d tensor', () => {
      test('should return number when single index is input ', () => {
        expect(getValuesFromTensor(tensor1d([1, 2, 3, 4, 5, 6]), 2)).toEqual(3);
      });

      test('should return number when single index in array as input ', () => {
        expect(getValuesFromTensor(tensor1d([1, 2, 3, 4, 5, 6]), [2])).toEqual(
          3
        );
      });

      test('should return number when ranged index ranged index as input ', () => {
        expect(
          getValuesFromTensor(tensor1d([1, 2, 3, 4, 5, 6]), [2, 3])
        ).toIncludeAllMembers([3, 4]);
      });
    });

    describe('for a 2d tensor', () => {
      test('a) should return array when single index is input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            1
          )
        ).toEqual([4, 5, 6]);
      });

      test('b) should return number when array index in array as input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            [1]
          )
        ).toEqual([4, 5, 6]);
      });

      test('c)  return number when ranged index is input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            [[0, 1]]
          )
        ).toIncludeAllMembers([
          [1, 2, 3],
          [4, 5, 6],
        ]);
      });

      test('d) should return number when (ranged index, index) is input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            [[0, 1], 1]
          )
        ).toIncludeAllMembers([2, 5]);
      });

      test('e) should return number when (index, ranged index) is input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            [1, [1, 2]]
          )
        ).toIncludeAllMembers([5, 6]);
      });

      test('f) should return number when (ranged index, ranged index) is input ', () => {
        expect(
          getValuesFromTensor(
            tensor2d([
              [1, 2, 3],
              [4, 5, 6],
              [8, 9, 0],
            ]),
            [
              [0, 1],
              [1, 2],
            ]
          )
        ).toIncludeAllMembers([
          [2, 3],
          [5, 6],
        ]);
      });
    });
  });
});
