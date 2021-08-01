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
import { useDispatch } from 'react-redux';

import { Context as ControlContext } from '_renderer/context/ControlContext';
import { applyOptions } from '_/renderer/store/ducks/control/actions';
import { Options } from '_/renderer/store/ducks/control/types';
import { initialOptions } from '_/renderer/store/ducks/control/reducer';

type FormValues = {
  base_radius: string;
};

const AxisConfig = () => {
  const { state } = useContext(ControlContext); // ! remove this

  const dispatch = useDispatch();

  const defaultValues: FormValues = {
    base_radius: state.config.base.radius.toString(),
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

      <Button type="submit" colorScheme="teal">
        Submit
      </Button>
    </VStack>
  );
};

export default AxisConfig;
