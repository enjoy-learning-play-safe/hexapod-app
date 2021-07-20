import * as tf from '@tensorflow/tfjs';

export const rotationSimple = (phi: number, theta: number, psi: number) => {
  const cpsi = Math.cos(psi);
  const ctheta = Math.cos(theta);
  const cphi = Math.cos(phi);
  const spsi = Math.sin(psi);
  const stheta = Math.sin(theta);
  const sphi = Math.sin(phi);

  const rota = tf.tensor2d([
    [
      cpsi * ctheta,
      cpsi * stheta * sphi - spsi * cphi,
      spsi * sphi + cpsi * stheta * cphi,
    ],
    [
      spsi * ctheta,
      cpsi * cphi + spsi * stheta * sphi,
      spsi * stheta * cphi - cpsi * sphi,
    ],
    [-stheta, ctheta * sphi, ctheta * cphi],
  ]);

  return rota;
};
