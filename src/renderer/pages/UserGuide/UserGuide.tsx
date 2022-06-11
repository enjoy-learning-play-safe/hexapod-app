import React from 'react';
import { Text } from '@chakra-ui/react'
import PageWrapper from '../PageWrapper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserGuide = (props: Props): JSX.Element => {
  return <PageWrapper>
    <Text fontSize='xl'><u><b>CONNECTING THE HEXAPOD</b></u></Text>
    <Text fontSize='md'>1. Make sure the Hexapod is powered and connected via USB.</Text>
    <Text fontSize='md'>2. Under the <b><i>Settings</i></b>  tab, refresh devices and connect to the Hexapod in the list.</Text>
    <Text fontSize='md'>&nbsp;&nbsp;&nbsp;&nbsp;(The devices in the list will most likely appear as COM ports. Each USB port on your computer is &nbsp;&nbsp;&nbsp;&nbsp;labelled as a COM port number. Disconnect any other USB devices except for the Hexapod and refresh &nbsp;&nbsp;&nbsp;&nbsp;the list. Only 1 COM port should be visible. This COM port is the USB port the Hexapod is connected &nbsp;&nbsp;&nbsp;&nbsp;to.)</Text>
    <br />
    <Text fontSize='xl'><u><b>START-UP PROCEDURE</b></u></Text>
    <Text fontSize='md'>1. Ensure all legs of the Hexapod are set to the lowest they can go. (You can manually push down each &nbsp;&nbsp;&nbsp;&nbsp;leg <span style={{ color: 'red' }}> <b><u>while the Hexapod is powered OFF</u></b> </span>  )</Text>
    <Text fontSize='md'>2. Under the <b><i>Control</i></b>  tab, click <b><i>Initialize</i></b> and wait 5 seconds. This establishes the serial connection with &nbsp;&nbsp;&nbsp;&nbsp;the controller. </Text>
    <Text fontSize='md'>3. Click <b><i>Calibrate Axes</i></b>. This performs the zeroing sequence which zeros all the legs to their zero position &nbsp;&nbsp;&nbsp;&nbsp;and moves the platform to the home position.</Text>
    <br />
    <Text fontSize='xl'><u><b>CONTROLLING HEXAPOD</b></u></Text>
    <Text fontSize='md'>The Hexapod is able to move simultaneously in 6 degrees of freedom, the X Y Z translation and Roll Pitch Yaw rotations. The translation movements are measured in millimeters and the rotation movements are measured in degrees. </Text>
    <br />
    <Text fontSize='md'>1. Under the <b><i>Control</i></b> tab, select the value of movement you want. It can be a single axis of movement or &nbsp;&nbsp;&nbsp;&nbsp;up to all 6 axes at once. </Text>
    <Text fontSize='md'>2. Click <b><i>Send Values</i></b>. The controller will automatically calculate its path and move the platform to the &nbsp;&nbsp;&nbsp;&nbsp;specified location.</Text>
    <Text fontSize='md'>3. The hexapod remembers its current location and thus you can move it to a new position from any &nbsp;&nbsp;&nbsp;&nbsp;location. Try it out by inputting and sending a new position. </Text>
    <Text fontSize='md'>4. If you want to return the Hexapod to its home position, you can click <b><i>Home Position</i></b> to reset all values &nbsp;&nbsp;&nbsp;&nbsp;to zero quickly. Next click <b><i>Send Values</i></b> to start the movement. </Text>
    <br />
    <Text fontSize='xl'><u><b>PRE-PROGRAMMED MOVEMENTS</b></u></Text>
    <Text fontSize='md'>With a bit of calculation, the Hexapod is able to make sequential movements to trace out different movement paths. We have created 2 sequences for you to try out. </Text>
    <br />
    <Text fontSize='md'>Rotation motion is a motion that moves the platform in a circular motion while rotating the platform such that it is always tilted towards the centre. </Text>
    <br />
    <Text fontSize='md'>Translational motion is a motion that moves the platform in a circular path while spiralling upwards before reserving the move back towards its home position.</Text>
    <br />
    <Text fontSize='md'>1. Under the <b><i>Control</i></b> tab, Reset All Axes and Send Values to return the Hexapod back to its home &nbsp;&nbsp;&nbsp;&nbsp;position.  </Text>
    <Text fontSize='md'>2. Under the <b><i>Application</i></b> tab, select the motion you want. The controller will automatically move the &nbsp;&nbsp;&nbsp;&nbsp;hexapod through the sequence. 
  </Text>

    </PageWrapper>;
};

export default UserGuide;
