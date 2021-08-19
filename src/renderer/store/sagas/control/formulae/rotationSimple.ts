import roundTo from 'round-to';

export const rotationSimple = (roll: number, pitch: number, yaw: number) => {
  const cpsi = Math.cos(yaw);
  const ctheta = Math.cos(pitch);
  const cphi = Math.cos(roll);
  const spsi = Math.sin(yaw);
  const stheta = Math.sin(pitch);
  const sphi = Math.sin(roll);

  const rotation = [
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
  ];

  const rotationRounded = rotation.map((row) => row.map((e) => roundTo(e, 16)));

  return rotationRounded; // 3x3 matrix
};
