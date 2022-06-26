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
<<<<<<< HEAD
      <ButtonGroup spacing = '6'>
        <Button onClick={handleClickCasualFlex}>Rotational Motion</Button>
        <Button onClick={handleClickFlex}>Translational Motion</Button>
=======
      <ButtonGroup height='100%' spacing ='4'>
        <Button height='100%' width='50%' onClick={handleClickCasualFlex}>Rotational Motion</Button>
        <Button height='100%' width='50%' onClick={handleClickFlex}>Translational Motion</Button>
>>>>>>> 63568a3c29f6aa3c2fea6b3733e504c4bf4e0fe1
      </ButtonGroup>
    </PageWrapper>
  );
};

export default FlexScreen;
