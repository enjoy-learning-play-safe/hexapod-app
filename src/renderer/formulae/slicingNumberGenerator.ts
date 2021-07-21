import { Tensor2D } from '@tensorflow/tfjs';

import { solveActuator } from './solveActuator';

export const slicingNumberGenerator = (
  startPose: Tensor2D,
  endPose: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  maxChangePerSlice: number,
  minimumSlicePerMovement: number
) => {
  const baseCoordsDebug = baseCoords.arraySync();
  const startPoseDebug = startPose.arraySync();
  const endPoseDebug = endPose.arraySync();

  const previousLegs = solveActuator(startPose, fixedRodsLength, baseCoords);
  const previousLegsArray = previousLegs.arraySync();

  const finalLegs = solveActuator(endPose, fixedRodsLength, baseCoords);
  const finalLegsArray = finalLegs.arraySync();

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
