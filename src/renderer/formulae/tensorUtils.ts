import { Tensor1D, Tensor2D } from '@tensorflow/tfjs';

// * 1d array

export const tensorToArray = (tensor: Tensor1D | Tensor2D) =>
  tensor.arraySync();

export const getValuesFromTensor = (
  tensor: Tensor1D | Tensor2D,
  index: number | Array<number | number[]>
) => {
  // this function's goal is to get our data out of tfjs and use it natively in ts
  const is2dTensor = tensor.shape.length === 2;

  try {
    if (!is2dTensor) {
      // if its a 1d tensor
      if (
        typeof index === 'number' ||
        (Array.isArray(index) &&
          index.length > 0 &&
          index.length < 3 &&
          index.every((element) => typeof element === 'number'))
      ) {
        const result1d = Array.from(tensor.gather(index).dataSync());
        return result1d.length > 1 ? result1d : result1d[0];
      } else {
        throw new Error('index not compatible with 1d tensor');
      }
    } else {
      // if its a 2d tensor

      // if index is a single digit or a digit in an array
      if (typeof index === 'number') {
        return tensor.gather(index).arraySync();
      } else if (Array.isArray(index)) {
        if (index.length === 1) {
          return tensor.gather(index).arraySync()[0];
        } else if (index.length === 2) {
          return tensor.gather(index[0], 0).gather(index[1], 1).arraySync();
        }
      }

      throw new Error('illegal index provided');
    }
  } catch (err) {
    throw new Error(err);
  }
};
