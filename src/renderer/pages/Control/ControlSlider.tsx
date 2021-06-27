import React, { useState } from 'react';

import {
  Flex,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
} from '@chakra-ui/react';

interface Props {
  axisName: string;
}

const ControlSlider = (props: Props): JSX.Element => {
  const { axisName } = props;

  const [sliderValue, setSliderValue] = useState(0);
  return (
    <Flex alignSelf="stretch" alignItems="center">
      <Heading variant="h6" mr={2} w="3em">
        {axisName}
      </Heading>
      <Slider
        min={-180}
        max={180}
        flex={1}
        aria-label="slider-ex-2"
        colorScheme="blue"
        defaultValue={sliderValue}
        onChange={(val) => setSliderValue(val)}
        my={4}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb>
          <Box boxSize={16}>
            <Text
              fontWeight="medium"
              fontSize="sm"
              w="3em"
              color="brand.500"
              textAlign="center"
            >
              {sliderValue}
            </Text>
          </Box>
        </SliderThumb>
      </Slider>
    </Flex>
  );
};

export default ControlSlider;
