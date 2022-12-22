import { extendTheme } from '@chakra-ui/react'

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
  }
}

export const theme = extendTheme(customTheme)