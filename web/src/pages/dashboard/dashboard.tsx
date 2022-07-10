import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { checkAuth, signOut } from '../../services/auth.service';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import NavTabs from '../../components/NavTabs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await checkAuth();
      setIsSignIn(true);
    } catch (err) {
      console.log(err);
      setIsSignIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <Container
      component="main"
      fixed
      sx={{
        height: '600px',
        width: '1200px',
      }}
    >
      <Box
        sx={{
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            height: '540px',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
            <NavTabs />
          </Box>
          <Divider orientation="vertical" flexItem></Divider>
          <Box
            sx={{
              width: '100%',
            }}
          >
            {isSignIn ? <Outlet /> : ''}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;