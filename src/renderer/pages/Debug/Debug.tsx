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
import { SerialportContext } from '_/renderer/context';

interface Props {}

const Debug = (props: Props) => {
  const [rawInputValue, setRawInputValue] = useState('');

  const onRawInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRawInputValue(e.target.value);
  };

  const { state, dispatch } = useContext(SerialportContext);

  const handleRawInputSubmit = async () => {
    dispatch({ type: 'WRITE', message: rawInputValue });
  };

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
    </PageWrapper>
  );
};

export default Debug;
