import React, { FormEvent, useContext, useState } from 'react';
import {
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';

import { applyOptions } from '_/renderer/store/ducks/control/actions';
import { Options } from '_/renderer/store/ducks/control/types';
import { initialOptions } from '_/renderer/store/ducks/control/reducer';

type FormValues = {
  base_radius: string;

  range_x: string;
  range_y: string;
  range_z: string;
  range_roll: string;
  range_pitch: string;
  range_yaw: string;
};

const AxisConfig = () => {
  const state = useSelector((store: any) => store.control); // ! dont use any type

  const dispatch = useDispatch();

  const defaultValues: FormValues = {
    base_radius: state.config.base.radius.toString(),

    range_x: state.config.range.x.toString(),
    range_y: state.config.range.y.toString(),
    range_z: state.config.range.z.toString(),
    range_roll: state.config.range.roll.toString(),
    range_pitch: state.config.range.pitch.toString(),
    range_yaw: state.config.range.yaw.toString(),
  };

  const { control, handleSubmit, register } = useForm({
    defaultValues,
  });

  const handleSubmitClick = (data: FormValues) => {
    // console.debug(JSON.stringify(data, null, 2));

    const options: Options = {
      ...initialOptions,
      base: {
        radius: parseFloat(data.base_radius),
      },
      range: {
        x: parseFloat(data.range_x),
        y: parseFloat(data.range_y),
        z: parseFloat(data.range_z),
        roll: parseFloat(data.range_roll),
        pitch: parseFloat(data.range_pitch),
        yaw: parseFloat(data.range_yaw),
      },
    };

    console.log(options);

    dispatch(applyOptions(options));
  };

  return (
    <VStack
      as="form"
      alignItems="flex-start"
      p={6}
      onSubmit={handleSubmit((data) => handleSubmitClick(data))}
    >
      <Heading>Config</Heading>

      <SectionHeading>Base</SectionHeading>
      <Controller
        control={control}
        name="base_radius"
        render={({ field: { name, ...restField } }) => (
          <HStack>
            <FormLabel my={0}>Radius</FormLabel>
            <NumberInput {...restField}>
              <NumberInputField name={name} />
            </NumberInput>
            <HStack></HStack>
          </HStack>
        )}
      />

      <SectionHeading>Range</SectionHeading>
      {[
        'range_x',
        'range_y',
        'range_z',
        'range_roll',
        'range_pitch',
        'range_yaw',
      ].map((axis) => (
        <Controller
          key={axis}
          control={control}
          name={
            axis as
              | 'range_x'
              | 'range_y'
              | 'range_z'
              | 'range_roll'
              | 'range_pitch'
              | 'range_yaw'
          }
          render={({ field: { name, ...restField } }) => (
            <HStack>
              <FormLabel my={0} w={12}>
                {axis.slice(6, 7).toUpperCase() + axis.slice(7)}
              </FormLabel>
              <NumberInput {...restField}>
                <NumberInputField name={name} />
              </NumberInput>
              <HStack></HStack>
            </HStack>
          )}
        />
      ))}

      <Button mt={4} type="submit" colorScheme="teal">
        Apply
      </Button>
    </VStack>
  );
};

export default AxisConfig;

type SectionHeadingProps = {
  children: React.ReactNode;
};

const SectionHeading = (props: SectionHeadingProps) => (
  <Heading as="h3" variant="h3">
    {props.children}
  </Heading>
);
