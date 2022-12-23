import { extendTheme } from '@chakra-ui/react'

// type CustomTheme = Theme | {
//   space: {
//     xxsm: string,
//     xxsmall: string,
//     xsm: string,
//     xsmall: string,
//     small: string,
//     sm: string,
//     medium: string,
//     md: string,
//     large: string,
//     lg: string,
//     xlarge: string,
//     xl: string,
//     xxlarge: string,
//     xxl: string
//   },
//   colors: any,
// }

const customTheme = {
  space: {
    xxsm: '4px',
    xxsmall: '4px',
    xsm: '8px',
    xsmall: '8px',
    small: '16px',
    sm: '16px',
    medium: '24px',
    md: '24px',
    large: '32px',
    lg: '32px',
    xlarge: '40px',
    xl: '40px',
    xxlarge: '64px',
    xxl: '64px'
  },
  colors: {
    app: {
      gray: '#F9F9F9'
    }
  }
}

export const theme = extendTheme(customTheme)