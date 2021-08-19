import { Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { flex } from '_/renderer/store/ducks/control/actions';
import PageWrapper from '../PageWrapper';

const FlexScreen = () => {
  const dispatch = useDispatch();

  const handleClickCasualFlex = () => {
    // todo: do flex
    console.log('clicked casual flex button');
    dispatch(flex());
  };

  return (
    <PageWrapper>
      <Button onClick={handleClickCasualFlex}>Microscope Inspection</Button>
    </PageWrapper>
  );
};

export default FlexScreen;
