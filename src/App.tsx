import './App.css'
import '@/styles/index.scss'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from '@/common/theme.ts'
import useDevice from "hooks/useDevice.ts"
import AdminLayout from '@/layout/AdminLayout.tsx'
import PCLayout from '@/layout/PCLayout.tsx'
import MobileLayout from '@/layout/MobileLayout.tsx'

function App() {
  const { isMobile, isAdmin } = useDevice();
  // 根据设备类型确定布局
  const setLayout = () => {
    return isMobile? <MobileLayout></MobileLayout> : isAdmin? <AdminLayout></AdminLayout> : <PCLayout></PCLayout>
  }
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline/>
        {setLayout()}
      </ThemeProvider>
    </>
  )
}

export default App
