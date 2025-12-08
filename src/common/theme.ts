// src/theme/index.ts（建议改ts后缀，TS类型更友好）
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 900,
      xl: 1200,
    },
    unit: 'px'
  },
  palette: {
    primary: {
      main: '#4CAF50'
    }
  }
});
export default theme;