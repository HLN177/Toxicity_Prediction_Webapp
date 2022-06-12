import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box mb={2}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              autoComplete='email'
              autoFocus
              fullWidth
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                navigate('/signin');
              }}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;