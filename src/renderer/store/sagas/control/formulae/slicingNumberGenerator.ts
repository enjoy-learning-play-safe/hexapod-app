import { solveActuator } from './solveActuator';

export const slicingNumberGenerator = (
  startPose: number[][],
  endPose: number[][],
  fixedRodsLength: number,
  baseCoords: number[][],
  maxChangePerSlice: number,
  minimumSlicePerMovement: number
) => {
  const previousLegs = solveActuator(startPose, fixedRodsLength, baseCoords);
  const previousLegsArray = previousLegs;

  const finalLegs = solveActuator(endPose, fixedRodsLength, baseCoords);
  const finalLegsArray = finalLegs;

  const actuatorChange = finalLegsArray.map((joint, index) =>
    Math.abs(finalLegsArray[index] - previousLegsArray[index])
  );

  const maxActuatorChange = Math.max(...actuatorChange);

  const slicingNumber = Math.round(
    Math.ceil(maxActuatorChange / maxChangePerSlice)
  );

  return slicingNumber >= minimumSlicePerMovement
    ? slicingNumber
    : minimumSlicePerMovement;
};
