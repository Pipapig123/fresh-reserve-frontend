import './App.css'
import '@/styles/index.scss'
import CssBaseline from '@mui/material/CssBaseline';
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
      <CssBaseline/>
      {setLayout()}
    </>
  )
}

export default App
