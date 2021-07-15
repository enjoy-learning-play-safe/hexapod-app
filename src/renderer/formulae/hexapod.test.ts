// import tf, { Tensor, Rank, Tensor2D } from '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';

import { platformAngles } from '../fixtures/testFixtures';
import {
  actuatorSolving,
  generateBCoor,
  matMulTensor,
  pCoorPbasis,
  pCoorXY,
  previousInput,
} from './hexapod';

// import { actuatorSolving } from './hexapod';

describe('#formulae/hexapod', () => {
  test('should return previousInput as initialized', () => {
    expect(previousInput.arraySync()).toEqual(
      tf.tensor1d([0, 0, 0, 0, 0, 0]).arraySync()
    );
  });

  test('should return platformAngles as expected', () => {
    expect(platformAngles.sin().mul(tf.scalar(5)).arraySync()).toEqual([
      0, 4.330127239227295, 4.330126762390137, -4.37113897078234e-7,
      -4.330127239227295, -4.330127239227295,
    ]);
  });

  test('should return pCoorXY as expected', () => {
    expect(pCoorXY.arraySync()).toEqual([
      [
        1, 0.4999999701976776, -0.5000000596046448, -1, -0.49999991059303284,
        0.49999991059303284,
      ],
      [
        0, 4.330127239227295, 4.330126762390137, -4.37113897078234e-7,
        -4.330127239227295, -4.330127239227295,
      ],
    ]);
  });

  test('should return pCoorPbasis', () => {
    expect(pCoorPbasis.arraySync()).toEqual([
      [
        1, 0.4999999701976776, -0.5000000596046448, -1, -0.49999991059303284,
        0.49999991059303284,
      ],
      [
        0, 4.330127239227295, 4.330126762390137, -4.37113897078234e-7,
        -4.330127239227295, -4.330127239227295,
      ],
      [0, 0, 0, 0, 0, 0],
    ]);
  });

  test('test the generateBCoor', () => {
    const bCoor = generateBCoor(pCoorXY);
    console.log('bCoor', bCoor);

    expect(bCoor).toEqual([
      [
        107.37645721435547, 0.5000069737434387, -0.5000030398368835,
        -107.37647247314453, -106.87645721435547, 106.87647247314453,
      ],
      [
        -61.41648864746094, 123.69898986816406, 123.69898986816406,
        -61.41646957397461, -62.28251266479492, -62.28248977661133,
      ],
    ]);
  });

  test('should return solved matrix for actuator', async () => {
    console.log('matMulTensor');
    matMulTensor.print();
  });
});
