import roundTo from 'round-to';

export const solveActuator = (
  platformCoords: number[][],
  fixedRodsLength: number,
  baseCoords: number[][],
  precision?: number
) => {
  const numLegs = platformCoords[0].length;

  const [platformX, platformY, platformZ] = platformCoords;

  const [baseX, baseY, baseZ] = baseCoords;

  const legsArray = new Array(numLegs)
    .fill(undefined)
    .map(
      (undef, index) =>
        platformZ[index] -
        Math.abs(
          fixedRodsLength ** 2 -
            (platformX[index] - baseX[index]) ** 2 -
            (platformY[index] - baseY[index]) ** 2
        ) **
          0.5
    );

  const legs = legsArray.map((element) =>
    precision ? roundTo(element, precision) : element
  );

  return legs;
};
