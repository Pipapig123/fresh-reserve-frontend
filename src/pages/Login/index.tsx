import * as React from "react";
import {useState, Fragment, useEffect, useLayoutEffect} from "react";
import useDevice from "hooks/useDevice.ts";
import { ThemeProvider } from '@mui/material/styles';
import {Paper, Tabs, Tab, Box, TextField, Button as MuiButtton   } from '@mui/material';
import {PersonOutline, LockOpen } from '@mui/icons-material';
import {Input , Typography, Button, Checkbox } from 'react-vant';
import theme from '@/common/theme.ts'
import './index.scss'

type LoginType = 0 | 1 | 2
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface LoginForm {
  account: string | undefined
  password: string | undefined
}
interface PanelContentProps {
  form: LoginForm
  setForm: React.Dispatch<React.SetStateAction<LoginForm>>
  login: () => void
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
      {value === index && <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</Box>}
    </div>
  );
}
const PanelContent = (props: PanelContentProps) => {
  const { form, setForm, login } = props
  const [isChecked, setIsChecked] = useState<boolean>(false)
  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', my: 2 }}>
        <PersonOutline sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="input-account"
          type='tel'
          label="请输入账号"
          variant="standard"
          size='small'
          value={form.account}
          onChange={(e) => setForm({...form, account: e.currentTarget.value})}
          classes={{root: 'account'}}/>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', my: 2 }}>
        <LockOpen sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-pwd"
                   type='password'
                   label="请输入密码"
                   variant="standard"
                   size='small'
                   classes={{root: 'pwd'}} value={form.password}
                   onChange={(e) => setForm({...form, password: e.currentTarget.value})} />
      </Box>
      <Box  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',width: '80%', my: 2   }}>
        <MuiButtton onClick={login} color='primary' variant='contained' classes={{root: 'loginBtn'}} disabled={!isChecked}>登录</MuiButtton>
      </Box>
      <Box sx={{ display: 'flex',justifyContent: 'flex-end', alignItems: 'flex-end',width: '80%'}}>
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e)} className='check' checkedColor={theme.palette.primary.main} shape='square'>
          我已阅读并同意 <span className='agreement'>《鲜到家用户协议》</span> 和 <span className='agreement'>《隐私政策》</span>
        </Checkbox>
      </Box>
    </Fragment>
  )
}
const Login = () => {
  const { isMobile } = useDevice()
  const [value, setValue] = useState<LoginType>(0);
  const [form, setForm] = useState<LoginForm>({account: '', password: ''})
  const [checked, setChecked] = React.useState(false)
  
  useLayoutEffect(() => {
    if (isMobile) {
      requestAnimationFrame(() => {
        setValue(2)
      })
    }
  }, [isMobile]);
  
  const handleChange = (event: React.SyntheticEvent, newValue: LoginType) => {
    setValue(newValue)
    setForm({
      account: undefined,
      password: undefined
    })
  };
  const login = () => {
    console.log(form, 'form')
    console.log(value, isMobile, 'value')
  }
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
                    value={form.account}
                    onChange={account => setForm({ ...form, account: account })}
                    placeholder='请输入账号'
                    clearable
                    className='account'
                  />
                  <Input
                    type='password'
                    value={form.password}
                    onChange={pwd => setForm({ ...form, password: pwd })}
                    placeholder='请输入密码'
                    clearable
                    className='pwd'
                  />
                  <Button round type='info' className='submit' onClick={login} disabled={!checked}>
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
                        <PanelContent form={form} setForm={setForm} login={login}/>
                      </CustomTabPanel>
                      <CustomTabPanel value={value} index={1}>
                        <PanelContent form={form} setForm={setForm} login={login}/>
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