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
import { Options, State } from '_/renderer/store/ducks/control/types';
import { initialOptions } from '_/renderer/store/ducks/control/reducer';

import PageWrapper from '../PageWrapper';

type FormValues = {
  base_radius: string;

  platform_radius: string;

  actuator_min: string;
  actuator_max: string;
  actuator_home: string;
  actuator_precision: string;

  fixedRods_len: string;
  fixedRods_count: string;

  slice_maxChangePerSlice: string;
  slice_minSlicePerMovement: string;

  default_x: string;
  default_y: string;
  default_z: string;
  default_roll: string;
  default_pitch: string;
  default_yaw: string;

  range_x: string;
  range_y: string;
  range_z: string;
  range_roll: string;
  range_pitch: string;
  range_yaw: string;

  delayDuration: string;
};

const AxisConfig = () => {
  const state: State = useSelector((store: any) => store.control); // ! dont use any type

  const dispatch = useDispatch();

  const defaultValues: FormValues = {
    base_radius: state.options.base.radius.toString(),

    platform_radius: state.options.platform.radius.toString(),

    actuator_min: state.options.actuator.min.toString(),
    actuator_max: state.options.actuator.max.toString(),
    actuator_home: state.options.actuator.home.toString(),
    actuator_precision: state.options.actuator.precision.toString(),

    fixedRods_len: state.options.fixedRods.len.toString(),
    fixedRods_count: state.options.fixedRods.count.toString(),

    slice_maxChangePerSlice: state.options.slice.maxChangePerSlice.toString(),
    slice_minSlicePerMovement:
      state.options.slice.minSlicePerMovement.toString(),

    default_x: state.options.default.x.toString(),
    default_y: state.options.default.y.toString(),
    default_z: state.options.default.z.toString(),
    default_roll: state.options.default.roll.toString(),
    default_pitch: state.options.default.pitch.toString(),
    default_yaw: state.options.default.yaw.toString(),

    range_x: state.options.range.x.toString(),
    range_y: state.options.range.y.toString(),
    range_z: state.options.range.z.toString(),
    range_roll: state.options.range.roll.toString(),
    range_pitch: state.options.range.pitch.toString(),
    range_yaw: state.options.range.yaw.toString(),

    delayDuration: state.options.delayDuration.toString(),
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
    <PageWrapper>
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

        <SectionHeading>Platform</SectionHeading>
        <Controller
          control={control}
          name="platform_radius"
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

        <SectionHeading>Actuator</SectionHeading>
        {[
          'actuator_min',
          'actuator_max',
          'actuator_home',
          'actuator_precision',
        ].map((item) => (
          <Controller
            control={control}
            key={item}
            name={
              item as
                | 'actuator_min'
                | 'actuator_max'
                | 'actuator_home'
                | 'actuator_precision'
            }
            render={({ field: { name, ...restField } }) => (
              <HStack>
                <FormLabel my={0}>
                  {item.slice(9, 10).toUpperCase() + item.slice(10)}
                </FormLabel>
                <NumberInput {...restField}>
                  <NumberInputField name={name} />
                </NumberInput>
                <HStack></HStack>
              </HStack>
            )}
          />
        ))}

        <SectionHeading>Fixed Rods</SectionHeading>
        <Controller
          control={control}
          name="fixedRods_len"
          render={({ field: { name, ...restField } }) => (
            <HStack>
              <FormLabel my={0}>Length</FormLabel>
              <NumberInput {...restField}>
                <NumberInputField name={name} />
              </NumberInput>
              <HStack></HStack>
            </HStack>
          )}
        />

        <SectionHeading>Slice</SectionHeading>
        <Controller
          control={control}
          name="slice_maxChangePerSlice"
          render={({ field: { name, ...restField } }) => (
            <HStack>
              <FormLabel my={0}>Max Change Per Slice</FormLabel>
              <NumberInput {...restField}>
                <NumberInputField name={name} />
              </NumberInput>
              <HStack></HStack>
            </HStack>
          )}
        />
        <Controller
          control={control}
          name="slice_minSlicePerMovement"
          render={({ field: { name, ...restField } }) => (
            <HStack>
              <FormLabel my={0}>Min Slice Per Movement</FormLabel>
              <NumberInput {...restField}>
                <NumberInputField name={name} />
              </NumberInput>
              <HStack></HStack>
            </HStack>
          )}
        />

        <SectionHeading>Default</SectionHeading>
        {[
          'default_x',
          'default_y',
          'default_z',
          'default_roll',
          'default_pitch',
          'default_yaw',
        ].map((axis) => (
          <Controller
            key={axis}
            control={control}
            name={
              axis as
                | 'default_x'
                | 'default_y'
                | 'default_z'
                | 'default_roll'
                | 'default_pitch'
                | 'default_yaw'
            }
            render={({ field: { name, ...restField } }) => (
              <HStack>
                <FormLabel my={0} w={12}>
                  {axis.slice(8, 9).toUpperCase() + axis.slice(9)}
                </FormLabel>
                <NumberInput {...restField}>
                  <NumberInputField name={name} />
                </NumberInput>
                <HStack></HStack>
              </HStack>
            )}
          />
        ))}

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

        <SectionHeading>Delay</SectionHeading>
        <Controller
          control={control}
          name="delayDuration"
          render={({ field: { name, ...restField } }) => (
            <HStack>
              <FormLabel my={0}>Duration</FormLabel>
              <NumberInput {...restField}>
                <NumberInputField name={name} />
              </NumberInput>
              <HStack></HStack>
            </HStack>
          )}
        />

        <Button mt={8} type="submit" colorScheme="teal">
          Apply
        </Button>
      </VStack>
    </PageWrapper>
  );
};

export default AxisConfig;

type SectionHeadingProps = {
  children: React.ReactNode;
};

const SectionHeading = (props: SectionHeadingProps) => (
  <Heading as="h3" variant="h3" pt={6}>
    {props.children}
  </Heading>
);
