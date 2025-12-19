import './App.css';
import '@/styles/index.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar } from '@mui/material';
import * as React from 'react';
import useStore from '@/store';
import { Outlet } from 'react-router';

function App() {
  const tipsMessage = useStore(state => state.tipsMessage);
  const tipOpen = useStore(state => state.tipOpen);
  console.log(tipOpen, 'tipOpen');
  const setTip = useStore(state => state.setTip);
  
  return (
    <>
      <CssBaseline />
      <Outlet></Outlet>
      <Snackbar
        open={tipOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={setTip}
        message={tipsMessage}
        transitionDuration={500}
      />
    </>
  );
}

export default App;
