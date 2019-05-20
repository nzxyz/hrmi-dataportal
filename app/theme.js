import { css } from 'styled-components';
// theme defining breakpoints, colors, sizes, grid gutters
// breakpoints:
// < 720px (45em): small (mobile)
// < 960px (60em): medium (tablet portrait)
// >= 961px (72em): large (tablet landscape, desktop)
const myBreakpoints = [720, 960, 1152];
// theme breakpoints
export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
};
const text = {
  xxlarge: { size: '30px', height: '36px', maxWidth: '700px' },
  xlarge: { size: '24px', height: '30px', maxWidth: '700px' },
  large: { size: '20px', height: '25px', maxWidth: '700px' },
  medium: { size: '16px', height: '22px', maxWidth: '700px' },
};
const theme = {
  // used for grommet
  text,
  paragraph: text,
  global: {
    font: {
      family: 'Source Sans Pro',
      height: '22px',
      size: '16px',
    },
    colors: {
      black: '#09052F',
      'blue-dark': '#3A5161',
      text: { light: '#3A5161' },
      'light-1': '#F2F3F4', // <<< lightest      empowerment: '#262064', // AA large
      'light-2': '#EFEFEF',
      'light-3': '#E8EAE9',
      'light-4': '#D7D9DB',
      'light-5': '#D0D2D3',
      'dark-1': '#192E3A', // darkest >>>
      'dark-2': '#2C3F4B',
      'dark-3': '#667884', // AA
      'dark-4': '#8896A0', // AA large
      empowerment: '#262064', // AA
      empowermentDark: '#262064', // AA
      empowermentCloud: '#262064', // AA
      physint: '#6C3F99', // AA large
      physintDark: '#6C3F99', // AA
      physintCloud: '#6C3F99', // AA
      esr: '#27AAE1', // AA large
      esrDark: '#027AC0', // AA
      esrCloud: '#004f8f', // AA
    },
    // margins & paddings
    edgeSize: {
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
    },
    breakpoints: {
      small: {
        value: myBreakpoints[0],
      },
      medium: {
        value: myBreakpoints[1],
      },
      large: {
        value: myBreakpoints[2],
      },
      xlarge: {},
    },
  },
  tab: {
    pad: {
      vertical: 'none',
      bottom: '1px',
    },
    margin: {
      vertical: 'none',
    },
    extend: props => css`
      font-weight: ${props.theme.columnHeader.fontWeight};
    `,
  },
  tabs: {
    header: {
      extend: props => css`
        padding-left: ${props.theme.global.edgeSize.medium};
        border-bottom: ${props.theme.columnHeader.border};
      `,
    },
  },
  columnHeader: {
    border: '1px solid',
    fontWeight: 600,
  },
  maxWidth: '1200px',
  // colors: {
  //   white: '#fff',
  //   black: '#09052F',
  //   hover: '#2956D1',
  //   hoverLight: '#EFEFEF',
  //   darkBlue: '#3A5161',
  //   dark: '#192E3A', // darkest >>>
  //   dark2: '#2C3F4B',
  //   dark3: '#667884', // AA
  //   dark4: '#8896A0', // AA large
  //   light5: '#D0D2D3',
  //   light4: '#D7D9DB',
  //   light3: '#E8EAE9',
  //   light2: '#EFEFEF',
  //   light: '#F2F3F4', // <<< lightest
  //   highlight: '#FDB933',
  //   highlight2: '#DB7E00', // AA large
  //   highlight3: '#AD6500', // AA
  // },
};
/**
 * SVG icon component that produces an inline SVG image if **compound paths** are defined in app constant `ICONS`.
 *
 * For each icon one or more SVG-paths are required and optionally also the viewport size (defaults to app constant `ICON_SIZE`)
 *
 * ```js
 * const ICONS = {
 *   name: {
 *     size: 38, // original icon size (viewBox)
 *     paths: ['s v g', 'p a t h s'],
 *   },
 *   singlePathIcon: {
 *     size: 38,
 *     path: 's v g p a t h', // single path
 *   },
 *   iconWithDefaultSize: {
 *     paths: ['s v g', 'p a t h s'], // omitting the size (defaults to 38px)
 *   },
 *   iconWithDefaultSizeAlt: ['s v g', 'p a t h s'], // omitting the size allows paths shorthand
 *   singlePathIconWithDefaultSize: 's v g p a t h', // omitting the size allows path shorthand
 * };
 */

export const ICON_SIZE = 24; // default size
export const ICONS = {
  COUNTRY:
    'M12,1.25A10.75,10.75,0,1,0,22.75,12,10.76,10.76,0,0,0,12,1.25ZM2.75,12A9.15,9.15,0,0,1,4,7.45l-.61,2.67L4.47,12.9,4.77,14s1.36,4.21,1.36,4.43A13,13,0,0,0,8,20.31,9.26,9.26,0,0,1,2.75,12ZM12,21.25a9.23,9.23,0,0,1-3.86-.85L8,19.28l1.43-1,.9-2L10,15,6,12.67,5,13V12L5.15,11l4.2-2.78-.82-1.8-.9.45L7.1,6l2-1.12L8.74,3.35a9.21,9.21,0,0,1,6.84.12L16,4,15,4.45,15.05,6l.9.3.15.38-.82.52-1-.3-.15.38.6.75L14.6,9l-.6.22V10h.9l1.5-1.65,2.33.37.37.75-1.72.76-.83-.38-2.17.9-1.13,2.18,1.28,1,1.87-.07s1.73,2.25,1.43,2.25-.6,2.1-.6,2.1l2.62-1.31A9.26,9.26,0,0,1,12,21.25Zm8.23-5.05,1-3.57-.3-1.28L19.63,10l1.2.83.23-.7A9.64,9.64,0,0,1,21.25,12,9.14,9.14,0,0,1,20.23,16.2ZM12.12,3.36a12.65,12.65,0,0,1,.53,1.2L10.17,7,9.8,4.11S12,3.14,12.12,3.36Z',
  METRICS:
    'M4,14H7v7H4Zm4,7h3V10H8Zm4,0h3V11H12Zm4,0h3V7H16ZM12.83,8.66l6.29-5.45-1-1.14L12.62,6.85l-3.8-2L3.09,8.68l.83,1.25,5-3.32Z',
};

export default theme;
