// eslint-disable-next-line object-curly-newline
import React, { useState } from 'react';

import { Flex, Icon as ChakraIcon, Spacer, Text } from '@chakra-ui/react';
// eslint-disable-next-line object-curly-newline
import {
  IoHome,
  IoAnalytics,
  IoHammer,
  IoCog,
  IoBagHandle,
  IoGameController,
  IoBook,
  IoBarbell,
  IoApps,
} from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

interface IconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: any;
}

const Icon = (props: IconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { as } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <ChakraIcon as={as} mr={2} mb={1} boxSize="1.25em" />;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarItemProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  const { children, href, onClick } = props;
  const { pathname } = useLocation();

  const active = `/${pathname.split('/')[1]}` === href;
  return (
    <Link to={href} onClick={onClick}>
      <Flex
        my={2}
        py={2}
        px={2}
        bg={active ? 'brand.500' : 'gray.800'}
        borderRadius="sm"
        justifyContent="flex-start"
        alignItems="center"
        cursor="pointer"
      >
        <Text color={active ? 'gray.800' : 'brand.600'} fontWeight="semibold">
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SideBar = (props: Props) => {
  const [settingsTapCount, setSettingsTapCount] = useState(0);
  return (
    <Flex flex="0 0 13em" flexDirection="column" px={2} pt={2} bg="gray.900">
      {/* <SidebarItem href="/">
        <Icon as={IoHome} />
        Home
      </SidebarItem> */}
      <SidebarItem href="/control">
        <Icon as={IoGameController} />
        Control
      </SidebarItem>
      <SidebarItem href="/flex">
        <Icon as={IoApps} />
        Application
      </SidebarItem>
      {settingsTapCount >= 10 && (
        <>
          <SidebarItem href="/axis-config">
            <Icon as={IoAnalytics} />
            Axis Configuration
          </SidebarItem>
          <SidebarItem href="/debug">
            <Icon as={IoHammer} />
            Test/Debug
          </SidebarItem>
        </>
      )}
      {/* <SidebarItem href="">
        <Icon as={IoBagHandle} />
        Upgrade Hexapod
      </SidebarItem> */}
      <Spacer />
      <SidebarItem href="/user-guide">
        <Icon as={IoBook} />
        User Guide
      </SidebarItem>
      <SidebarItem
        href="/settings"
        onClick={() => setSettingsTapCount(settingsTapCount + 1)}
      >
        <Icon as={IoCog} />
        Settings
      </SidebarItem>
    </Flex>
  );
};

export default SideBar;
