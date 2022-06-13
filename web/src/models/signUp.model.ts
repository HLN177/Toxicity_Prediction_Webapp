import { object, string, TypeOf } from "zod";

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

type SignUpType = TypeOf<typeof signUpSchema>;

export {
  signUpSchema
};

export type {
  SignUpType
};

