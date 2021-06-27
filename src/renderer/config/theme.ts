import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  // force dark mode
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    // color name is: cerulean
    DEFAULT: '#00B8FC',
    50: '#CCF1FF',
    100: '#B5EBFF',
    200: '#87DFFF',
    300: '#59D2FF',
    400: '#2BC6FF',
    500: '#00B8FC',
    600: '#009ED8',
    700: '#0084B5',
    800: '#006A91',
    900: '#00506D',
  },
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
};

const theme = extendTheme({ config, colors, fontWeights });

export default theme;
