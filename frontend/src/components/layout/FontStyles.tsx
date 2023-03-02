import { createGlobalStyle } from 'styled-components';
import RobotoLightWoff2 from '../../assets/fonts/roboto-light-webfont.woff2';
import RobotoLightWoff from '../../assets/fonts/roboto-light-webfont.woff';
import RobotoRegularWoff2 from '../../assets/fonts/roboto-regular-webfont.woff2';
import RobotoRegularWoff from '../../assets/fonts/roboto-regular-webfont.woff';
import RobotoBoldWoff2 from '../../assets/fonts/roboto-bold-webfont.woff2';
import RobotoBoldWoff from '../../assets/fonts/roboto-bold-webfont.woff';
import PoppinsLightWoff2 from '../../assets/fonts/poppins-light-webfont.woff2';
import PoppinsLightWoff from '../../assets/fonts/poppins-light-webfont.woff';
import PoppinsRegularWoff2 from '../../assets/fonts/poppins-regular-webfont.woff2';
import PoppinsRegularWoff from '../../assets/fonts/poppins-regular-webfont.woff';
import PoppinsBoldWoff2 from '../../assets/fonts/poppins-bold-webfont.woff2';
import PoppinsBoldWoff from '../../assets/fonts/poppins-bold-webfont.woff';
import WorkSansWoff2 from '../../assets/fonts/worksans-webfont.woff2';
import WorkSansWoff from '../../assets/fonts/worksans-webfont.woff';

const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-weight: 300;
    src: url(${RobotoLightWoff2}) format('woff2'), url(${RobotoLightWoff}) format('woff');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 400;
    src: url(${RobotoRegularWoff2}) format('woff2'), url(${RobotoRegularWoff}) format('woff');
  }
  @font-face {
    font-family: 'Roboto';
    font-weight: 700;
    src: url(${RobotoBoldWoff2}) format('woff2'), url(${RobotoBoldWoff}) format('woff');
  }
  @font-face {
    font-family: 'Poppins';
    font-weight: 300;
    src: url(${PoppinsLightWoff2}) format('woff2'), url(${PoppinsLightWoff}) format('woff');
  }
  @font-face {
    font-family: 'Poppins';
    font-weight: 400;
    src: url(${PoppinsRegularWoff2}) format('woff2'), url(${PoppinsRegularWoff}) format('woff');
  }
  @font-face {
    font-family: 'Poppins';
    font-weight: 700;
    src: url(${PoppinsBoldWoff2}) format('woff2'), url(${PoppinsBoldWoff}) format('woff');
  }
  @font-face {
    font-family: 'Work Sans';
    src: url(${WorkSansWoff2}) format('woff2'), url(${WorkSansWoff}) format('woff');
  }
`;

export default FontStyles;
