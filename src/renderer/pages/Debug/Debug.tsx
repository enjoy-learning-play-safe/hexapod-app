import React, { useContext, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import { ChangeEvent } from 'react';
import { Context as SerialportContext } from '_/renderer/context/SerialportContext';
import serial from '../../utils/serialport';

interface Props {}

const Debug = (props: Props) => {
  const [rawInputValue, setRawInputValue] = useState('');

  const onRawInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRawInputValue(e.target.value);
  };

  const { state, dispatch } = useContext(SerialportContext);

  const handleRawInputSubmit = async () => {
    // dispatch({ type: 'WRITE', message: rawInputValue });
    await serial.write(rawInputValue);
  };

  // const handleAnimateClick = () => {
  //   for (let i = 100; i < 150; i++) {
  //     dispatch({ type: 'WRITE', message: 'G0 Z' + i });
  //   }
  // };

  return (
    <PageWrapper>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Debug Mode</AlertTitle>
        <AlertDescription>Proceed with Caution 🤞🏼</AlertDescription>
      </Alert>

      <InputGroup mt={4}>
        <Input placeholder="G0 X0 Y0 Z0 A0 B0 C0" onChange={onRawInputChange} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleRawInputSubmit}>
            {'Send'}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* <Button onClick={handleAnimateClick}>Animate</Button> */}
    </PageWrapper>
  );
};

export default Debug;
