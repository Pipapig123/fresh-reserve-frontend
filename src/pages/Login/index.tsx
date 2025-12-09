import * as React from "react";
import { useState } from "react";
import useDevice from "hooks/useDevice.ts";
import { ThemeProvider } from '@mui/material/styles';
import {Paper, Tabs , Tab, Box} from '@mui/material';
import {ConfigProvider , Typography } from 'react-vant';
import theme from '@/common/theme.ts'
import './index.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps)=> {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { isMobile } = useDevice()
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='login-container'>
            {
              isMobile ? (
                  <ConfigProvider>
                    <Typography.Title level={2} type={'primary'}>欢迎登录鲜到家</Typography.Title>
                  </ConfigProvider>
              ) : (
                <Paper  square={false} classes={{ root: 'pcLogin-formBox' }}>
                  <Tabs value={value}
                        onChange={handleChange}
                        textColor={'primary'}
                        classes={{root: 'login-tabs'}}>
                    <Tab label="商家身份登录" {...a11yProps(0)} classes={{root: 'login-tabs-item'}} />
                    <Tab label="管理身份登录" {...a11yProps(1)} classes={{root: 'login-tabs-item'}} />
                  </Tabs>
                  <Box>
                    <CustomTabPanel value={value} index={0}>
                      Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      Item Two
                    </CustomTabPanel>
                  </Box>
                </Paper>
              )
            }
      </div>
    </ThemeProvider>)
}
export default Login