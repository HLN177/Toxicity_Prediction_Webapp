import { object, string, TypeOf } from "zod";

const signInSchema = object({
  email: string()
    .min(1, {message: 'Email is required'})
    .email({message: "Not a valid email"}),
  password: string().min(1, {message: 'Password is required'})
});

type SignInType = TypeOf<typeof signInSchema>;

export {
  signInSchema
};

export type {
  SignInType
};

