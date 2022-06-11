import { Button, ButtonGroup, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { casualFlex, flex } from '_/renderer/store/ducks/control/actions';
import PageWrapper from '../PageWrapper';

const FlexScreen = () => {
  const dispatch = useDispatch();

  
  const handleClickCasualFlex = () => {
    // todo: do flex
    console.log('clicked casual flex button');
    dispatch(casualFlex());
  };
  const handleClickFlex = () => {
    // todo: do flex
    console.log('clicked flex button');
    dispatch(flex());
  };

  return (
    <PageWrapper>
      <ButtonGroup spacing = '6'>
        <Button onClick={handleClickCasualFlex}>Rotational Motion</Button>
        <Button onClick={handleClickFlex}>Translational Motion</Button>
      </ButtonGroup>
    </PageWrapper>
  );
};

export default FlexScreen;
