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
import { SignUpType, signUpSchema } from '../../models/auth.models';
import { signUp } from '../../services/auth.service';
// import { useAppSelector } from '../../store/hook';
// import { selectCount } from '../../store/counter/counterSlice';

const SignUpPage: React.FC = () => {
  // const count = useAppSelector(selectCount);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema)
  });
  
  const onSubmit = async (data: SignUpType) => {
    try {
      await signUp(data);
      navigateToSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToSignIn = () => {
    navigate('/signin');
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
          Sign Up
        </Typography>
        {/* {count} */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box mb={2}>
            <TextField
              autoFocus
              required
              fullWidth
              margin="normal"
              id="name"
              label="Name"
              variant="outlined"
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
              {...register('name')}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Email"
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
            <TextField
              required
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              id="passwordComfirm"
              autoComplete="current-password"
              error={!!errors?.passwordConfirmation}
              helperText={errors?.passwordConfirmation ? errors.passwordConfirmation.message : null}
              {...register('passwordConfirmation')}
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
              onClick={navigateToSignIn}
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