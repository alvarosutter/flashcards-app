import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      background: string;
      headerBg: string;
      footerBg: string;
      inputBg: string;
      primaryText: string;
      altText: string;
      primary: string;
      primaryDarker: string;
      onPrimary: string;
      secondary: string;
      onSecondary: string;
      button: string;
      onButton: string;
      danger: string;
      onDanger: string;
      scrollbarBg: string;
      itemShadow: string;
    };
    fonts: {
      headersFont: 'Poppins';
      textFont: 'Roboto';
      altFont: 'Work Sans';
      btnFont: 'Poppins';
    };
    fontSizes: {
      xsmall: '0.8rem';
      small: '1.0rem';
      medium: '1.5rem';
      large: '3.0rem';
      xlarge: '4.5rem';
    };
    fontWeights: {
      light: 300;
      normal: 400;
      bold: 700;
    };
    breakpoints: {
      mobile: '576px';
      tablet: '768px';
      laptop: '992px';
      largeDevice: '1200px';
    };
  }
}
