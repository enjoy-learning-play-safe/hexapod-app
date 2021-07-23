import React from 'react';

import { Select } from '@chakra-ui/react';

const SelectConfig = () => {
  const handleSelectConfig: React.ChangeEventHandler<HTMLSelectElement> =
    () => {
      // TODO
      alert('no handle function created yet');
    };

  return (
    <Select
      value="hexapod" // TODO: change this to state value
      placeholder="Select config"
      mt={1}
      w={160}
      size="md"
      variant="filled"
      borderRadius="lg"
      onChange={handleSelectConfig}
      fontWeight="600"
    >
      <option value="hexapod">Hexapod</option>
      <option value="septapod">Septapod</option>
      <option value="octopod">Octopod</option>
    </Select>
  );
};

export default SelectConfig;
