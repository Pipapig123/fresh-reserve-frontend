import * as React from "react";
import { useState, Fragment } from "react";
import useDevice from "hooks/useDevice.ts";
import { ThemeProvider } from '@mui/material/styles';
import {Paper, Tabs , Tab, Box} from '@mui/material';
import {Input , Typography, hooks, Button, Checkbox } from 'react-vant';
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
  const [state, updateState] = hooks.useSetState({account: '', pwd: ''})
  const [checked, setChecked] = React.useState(false)
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
      <div className='login-container'>
            {
              isMobile ? (
                <Fragment>
                <Typography.Title level={2} className='title'>欢迎登录鲜到家</Typography.Title>
                  <Input
                    value={state.account}
                    onChange={account => updateState({ account })}
                    placeholder='请输入账号'
                    clearable
                    className='account'
                  />
                  <Input
                    type='password'
                    value={state.pwd}
                    onChange={pwd => updateState({ pwd })}
                    placeholder='请输入密码'
                    clearable
                    className='pwd'
                  />
                  <Button round type='info' className='submit'>
                    登录
                  </Button>
                  <Box className='review'>
                    <Checkbox checked={checked} onChange={setChecked} className='check' checkedColor={theme.palette.primary.main}>
                      我已阅读并同意 <span className='agreement'>《鲜到家用户协议》</span> 和 <span className='agreement'>《隐私政策》</span>
                    </Checkbox>
                  </Box>
                </Fragment>
              ) : (
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
              )
            }
      </div>
    )
}
export default Login