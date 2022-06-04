import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
  // the reason to omit these two properties
  // is because we don't need to pass them into this function
  // they're going to be generated by mongoose when we create and update
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {
  try {
    return await UserModel.create(input);
  } catch(e: any) {
    throw new Error(e);
  }
};