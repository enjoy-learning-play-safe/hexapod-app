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

const components = {
  Heading: {
    variants: {
      h1: {
        fontSize: '4xl',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '3xl',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '2xl',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: 'xl',
        fontWeight: 'bold',
      },
      h5: {
        fontSize: 'lg',
        fontWeight: 'bold',
      },
      h6: {
        fontSize: 'md',
        fontWeight: 'bold',
      },
      h7: {
        fontSize: 'sm',
        fontWeight: 'bold',
      },
    },
  },
  Text: {
    variants: {
      subtitle: {
        fontSize: 'xl',
        fontWeight: 'medium',
      },
      body: {
        fontSize: 'md',
        fontWeight: 'medium',
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fontWeights,
  components,
});

export default theme;
