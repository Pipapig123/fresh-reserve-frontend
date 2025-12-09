// import useDevice from "hooks/useDevice.ts";
import { useState } from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {Paper} from '@mui/material';
import './index.scss'

const Login = () => {
  const [value, setValue] = useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event)
  };
  // const { isMobile } = useDevice()
  return <div className='login-container'>
      <Paper  square={false}
              classes={{ root: 'login-formBox' }}
      >
        <TabContext value={value}
                    onChange={handleChange}
                    classes={{root: 'login-tabs'}}
        >
          <TabPanel icon={<PhoneIcon />} label="RECENTS" className='login-tabs-item'>1</TabPanel>
          <TabPanel icon={<FavoriteIcon />} label="FAVORITES" className='login-tabs-item'>2</TabPanel>
          <TabPanel icon={<PersonPinIcon />} label="NEARBY" className='login-tabs-item'>3</TabPanel>
        </TabContext>
      </Paper>
  </div>
}
export default Login