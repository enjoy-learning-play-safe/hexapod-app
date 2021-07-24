import { Tensor2D } from '@tensorflow/tfjs';

import { solveActuator } from './solveActuator';

export const slicingNumberGenerator = async (
  startPose: Tensor2D,
  endPose: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  maxChangePerSlice: number,
  minimumSlicePerMovement: number
) => {
  const previousLegs = await solveActuator(
    startPose,
    fixedRodsLength,
    baseCoords
  );
  const previousLegsArray = await previousLegs.array();

  const finalLegs = await solveActuator(endPose, fixedRodsLength, baseCoords);
  const finalLegsArray = await finalLegs.array();

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
