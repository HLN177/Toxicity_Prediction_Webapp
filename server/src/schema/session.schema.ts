import {object, string} from 'zod';

const createSessionSchema = object({
  body: object({
    email: string()
            .min(1, {message: 'Email is required'})
            .email({message: "Not a valid email"}),
    password: string().min(1, {message: 'Password is required'})
  })
});

export {
  createSessionSchema
};