import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInType } from '../../models/auth.models';
import { signIn } from '../../services/auth.service';
// import { useAppSelector, useAppDispatch } from '../../store/hook';
// import { decrement, increment } from '../../store/counter/counterSlice';

const SignInPage: React.FC = () => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (event: SignInType) => {
    try {
      const {accessToken, refreshToken} = await signIn(event);
      localStorage.setItem('accessToken', accessToken as string);
      console.log({
        accessToken,
        refreshToken
      });
      navigateToDashboard();
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {/* {count} */}
        {/* <Button
          variant="outlined"
          size="large"
          onClick={() => dispatch(increment())}
        >
          add
        </Button> */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box mb={2}>
            <TextField
              required
              autoFocus
              fullWidth
              id="email"
              label="Email"
              margin="normal"
              variant="outlined"
              autoComplete='email'
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
              {...register('email')}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
              {...register('password')}
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
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;