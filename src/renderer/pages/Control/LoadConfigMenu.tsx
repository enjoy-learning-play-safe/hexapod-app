import React, { useState } from 'react';

// eslint-disable-next-line object-curly-newline
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToast,
} from '@chakra-ui/react';
import { IoChevronUp } from 'react-icons/io5';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoadConfigMenu = (props: Props): JSX.Element => {
  const toast = useToast();

  const configs = [1, 2, 3, 4, 5];
  const [selectedConfig, setSelectedConfig] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface HandleClickMenuItemArgs {}

  const handleClickMenuItem = (args: HandleClickMenuItemArgs) => {
    console.log('handleClickMenuItem', args);
    setSelectedConfig(2);
    toast({
      // title: 'Config Loaded',
      description: 'Config Loaded',
      status: 'success',
      duration: 2500,
      position: 'top-right',
      isClosable: true,
    });
  };

  return (
    <Menu matchWidth>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            w={36}
            rightIcon={<IoChevronUp />}
          >
            {isOpen ? 'Close' : 'Load Config'}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue={selectedConfig.toString()}
              // title="Order"
              type="radio"
            >
              {configs.map((config) => (
                <React.Fragment key={config.toString()}>
                  <MenuItemOption
                    value={config.toString()}
                    onClick={handleClickMenuItem}
                  >
                    Config
                    {config.toString()}
                  </MenuItemOption>
                </React.Fragment>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default LoadConfigMenu;
