import { Outlet } from "react-router";
const PCLayout = () => {
  return <div className='pc-user-layout'>
    PC
    <Outlet/>
  </div>
}
export default PCLayout;