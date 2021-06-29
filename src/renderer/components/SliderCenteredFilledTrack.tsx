/* eslint-disable import/prefer-default-export */
import React from 'react';

import { Box } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  value: number;
  limit: number;
}

const SliderCenteredFilledTrack = (props: Props): JSX.Element => {
  const { value, limit } = props;

  const leftNegPercent = ((value + limit) / (limit * 2)) * 100;

  const widthNegPercentage = (Math.abs(value) / (limit * 2)) * 100;

  return (
    <Box
      left={value > 0 ? '50%' : `calc(${leftNegPercent}%)`}
      position="absolute"
      top="50%"
      width={`${widthNegPercentage}%`}
      transform="translateY(-50%)"
      height="inherit"
      bg="brand.500"
    />
  );
};

export default SliderCenteredFilledTrack;
