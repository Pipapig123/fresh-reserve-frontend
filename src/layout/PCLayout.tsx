import { Outlet } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/common/theme.ts'

const PCLayout = () => {
  return  <ThemeProvider theme={theme}>
    <div>pc</div>
    <Outlet/>
  </ThemeProvider>
}
export default PCLayout;