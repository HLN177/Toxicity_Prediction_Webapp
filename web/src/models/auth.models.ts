import { object, string, TypeOf } from "zod";

const signInSchema = object({
  email: string()
    .min(1, {message: 'Email is required'})
    .email({message: "Not a valid email"}),
  password: string().min(1, {message: 'Password is required'})
});

const signUpSchema = object({
  name: string()
    .min(1, {message: 'Name should be 1 or more characters long'}),
  password: string()
    .min(6, {message: "Password should be 6 chars minimum"}),
  passwordConfirmation: string()
    .min(1, {message: 'Password Confirmation is required'}),
  email: string()
    .email({message: "Not a valid email"})
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ["passwordConfirmation"]
});

type SignInType = TypeOf<typeof signInSchema>;

type SignUpType = TypeOf<typeof signUpSchema>;

interface TokenResponse {
  accessToken?: string,
  refreshToken?: string
};

export {
  signInSchema,
  signUpSchema
};

export type {
  SignInType,
  SignUpType,
  TokenResponse
};

