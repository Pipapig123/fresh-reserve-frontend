import * as React from 'react';
import { Fragment, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useDevice from 'hooks/useDevice.ts';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button as MuiButtton, Paper, Snackbar, Tab, Tabs, TextField } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import { LockOpen, PersonOutline } from '@mui/icons-material';
import { Checkbox } from 'react-vant';
import theme from '@/common/theme.ts';
import '../Login/index.scss';
import { register } from '@/api/auth.ts';

type RegisterType = 0 | 1 | 2

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface RegisterForm {
  account: string | undefined;
  password: string | undefined;
}

interface PanelContentProps {
  form: RegisterForm;
  setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
  register: () => void;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</Box>}
    </div>
  );
};
const PanelContent = (props: PanelContentProps) => {
  const { form, setForm, register } = props;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/login');
  };
  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', my: 2 }}>
        <PersonOutline sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="input-account"
          type="tel"
          label="请输入账号"
          variant="standard"
          size="small"
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.currentTarget.value })}
          classes={{ root: 'account' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', my: 2 }}>
        <LockOpen sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-pwd"
                   type="password"
                   label="请输入密码"
                   variant="standard"
                   size="small"
                   classes={{ root: 'pwd' }} value={form.password}
                   onChange={(e) => setForm({ ...form, password: e.currentTarget.value })} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', my: 2 }}>
        <MuiButtton onClick={register} color="primary" variant="contained" classes={{ root: 'registerBtn' }}
                    disabled={!isChecked}>注册</MuiButtton>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%' }}>
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e)} className="check"
                  checkedColor={theme.palette.primary.main} shape="square">
          我已阅读并同意 <span className="agreement">《鲜到家用户协议》</span> 和 <span
          className="agreement">《隐私政策》</span>
        </Checkbox>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '80%', mt: 2 }}>
        <p className="toRegister" onClick={toLogin}>已有账号？去登录</p>
      </Box>
    </Fragment>
  );
};
const Register = () => {
  const { isMobile } = useDevice();
  const [value, setValue] = useState<RegisterType>(0);
  const [form, setForm] = useState<RegisterForm>({ account: '', password: '' });
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const handleClick = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useLayoutEffect(() => {
    if (isMobile) {
      requestAnimationFrame(() => {
        setValue(2);
      });
    }
  }, [isMobile]);
  
  const handleChange = (event: React.SyntheticEvent, newValue: RegisterType) => {
    setValue(newValue);
    setForm({
      account: undefined,
      password: undefined,
    });
  };
  const toRegister = async () => {
    if (!form.password) {
      setSnackMessage('请输入密码');
      handleClick();
    }
    if (!form.account) {
      setSnackMessage('请输入账号');
      handleClick();
    }
    const { code, data, message } = await register({ ...form, role: value });
    if (code === 200) {
      setOpen(true);
      setSnackMessage('注册成功！');
      console.log(data, 'data---');
      localStorage.setItem('token', data.token);
      navigate('/login');
    } else {
      setOpen(true);
      setSnackMessage(message);
    }
  };
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  return (
    <div className="register-container">
      <ThemeProvider theme={theme}>
        <Paper square={false} classes={{ root: 'pcRegister-formBox' }}>
          <Tabs value={value}
                onChange={handleChange}
                textColor={'primary'}
                classes={{ root: 'register-tabs' }}>
            <Tab label="商家身份注册" {...a11yProps(0)} classes={{ root: 'register-tabs-item' }} />
            <Tab label="管理身份注册" {...a11yProps(1)} classes={{ root: 'register-tabs-item' }} />
          </Tabs>
          <Box>
            <CustomTabPanel value={value} index={0}>
              <PanelContent form={form} setForm={setForm} register={toRegister} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <PanelContent form={form} setForm={setForm} register={toRegister} />
            </CustomTabPanel>
          </Box>
        </Paper>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={handleClose}
          message={snackMessage}
          transitionDuration={500}
        />
      </ThemeProvider>
    </div>
  );
};
export default Register;