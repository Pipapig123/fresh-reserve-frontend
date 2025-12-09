import { Outlet } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/common/theme.ts'

const AdminLayout = () => {
  return  <ThemeProvider theme={theme}>
  <div>admin</div>
    <Outlet/>
  </ThemeProvider>
}
export default AdminLayout;