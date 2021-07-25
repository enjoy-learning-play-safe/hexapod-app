import React, { useContext, useState } from 'react';
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

import { Context as ControlContext } from '_renderer/context/ControlContext';

const AxisConfig = () => {
  const { state, dispatch } = useContext(ControlContext);

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      base_radius: state.config.base.radius,
    },
  });

  return (
    <VStack
      as="form"
      alignItems="flex-start"
      p={6}
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
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
