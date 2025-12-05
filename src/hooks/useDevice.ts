import { useEffect, useState } from "react";

interface DeviceResponse {
  isMobile: boolean;
  isPc: boolean;
  isAdmin: boolean;
}
// 识别当前设备类型，根据类型决定页面布局类型
const useDevice = (): DeviceResponse => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        // 小屏阈值：768px（低于=小屏，高于=大屏）
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);
    // const isAdmin = useAuth().role === 'admin'; // 管理员角色判断
    const isAdmin = false; // 管理员角色判断/
    return { isMobile, isPc: !isMobile, isAdmin };
};
export default useDevice;