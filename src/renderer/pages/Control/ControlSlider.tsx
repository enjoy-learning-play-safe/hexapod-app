import React, { useContext, useState } from 'react';

import {
  Flex,
  Heading,
  Slider,
  SliderTrack,
  SliderThumb,
  Box,
  Text,
  Spacer,
  Divider,
  Spinner,
  Fade,
} from '@chakra-ui/react';

// eslint-disable-next-line max-len
import SliderCenteredFilledTrack from '../../components/SliderCenteredFilledTrack';
import { Context as ControlContext } from '_renderer/context/ControlContext';
import ActionTypes from '_/renderer/context/ControlContext/types';

interface Props {
  axisName: string;
  sliderValue: number;
  setSliderValue: (value: number) => void;
  setSliderValueOnEndChange: (value: number) => Promise<void>;
  min: number;
  max: number;
  loading: boolean;
}

const ControlSlider = (props: Props): JSX.Element => {
  const {
    axisName,
    sliderValue,
    setSliderValue,
    setSliderValueOnEndChange,
    loading,
  } = props;

  const sliderThumbText = `${sliderValue > 0 ? '+' : ''}${sliderValue}`;

  const handleSliderChange = (val: number) => {
    setSliderValue(val);
  };

  const handleSliderChangeEnd = async (val: number) => {
    setSliderValueOnEndChange(val);
  };

  const limit = axisName.length === 1 ? 100 : 45;

  return (
    <Box alignSelf="stretch" mb={6}>
      <Flex alignItems="center">
        <Heading variant="h6" mr={2} w="3em" textAlign="center">
          {axisName}
        </Heading>
        <Flex flexDir="column" flex={1} ml={4} my={4} mr={4}>
          <Slider
            min={0 - limit}
            max={limit}
            aria-label="slider-ex-2"
            colorScheme="brand"
            defaultValue={sliderValue}
            value={sliderValue}
            onChange={handleSliderChange}
            // onChangeEnd={handleSliderChangeEnd}
          >
            <SliderThumb>
              <Box boxSize={16}>
                <Text
                  fontWeight="medium"
                  fontSize="sm"
                  w="3em"
                  color="brand.500"
                  textAlign="center"
                >
                  {sliderThumbText}
                </Text>
              </Box>
            </SliderThumb>
            <SliderTrack>
              <SliderCenteredFilledTrack value={sliderValue} limit={limit} />
            </SliderTrack>
          </Slider>
          <Box mt={-6} h={8} alignSelf="center">
            <Divider colorScheme="brand" orientation="vertical" />
          </Box>
        </Flex>
        <Fade in={loading}>
          <Box w={6} mr={-2}>
            <Spinner color="brand.500" size="sm" />
          </Box>
        </Fade>
      </Flex>
      <Flex mt={-10} height={7}>
        <Text ml={14} mt={5} fontSize="0.75em" fontWeight="medium">
          -{limit}
        </Text>
        <Spacer />
        <Text mr={5} mt={5} fontSize="0.75em" fontWeight="medium">
          +{limit}
        </Text>
      </Flex>
    </Box>
  );
};

export default ControlSlider;
