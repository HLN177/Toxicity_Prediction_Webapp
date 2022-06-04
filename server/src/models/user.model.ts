import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * create a typescript definition for user schema
 */
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  // below timestamps: true
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>
}

/**
 * mongoose.Schema
 * Each schema maps to a MongoDB collection 
 * and defines the shape of the documents within that collection.
 * 
 * By default, Mongoose adds an _id property to your schemas.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true // cound not have two use with same email
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // record creatAt time and updateAt time
  }
);

/**
 * hash password if password have changed
 * before document save
 */
userSchema.pre('save', async function(next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

/**
 * password compare when login
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
  ): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

/**
 * Mongoose will refuse to save a document that doesn't have an _id
 */
const UserModel = mongoose.model('User', userSchema);

export default UserModel;