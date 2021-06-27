import React, { useReducer } from 'react';

// eslint-disable-next-line object-curly-newline
import { Heading } from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import ControlInput from './ControlInput';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Control = (props: Props): JSX.Element => {
  const axes = ['X', 'Y', 'Z', 'Roll', 'Pitch', 'Yaw'];

  return (
    <PageWrapper>
      <Heading variant="h3" mb={6}>
        Control Hexapod™
      </Heading>

      <ControlInput axes={axes} />
    </PageWrapper>
  );
};

export default Control;
