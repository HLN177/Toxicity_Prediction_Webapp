import mongoose from "mongoose";
import { UserDocument } from "./user.model";

/**
 * create a typescript definition for user schema
 */
interface SessionDocument extends mongoose.Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * mongoose.Schema
 * Each schema maps to a MongoDB collection 
 * and defines the shape of the documents within that collection.
 * 
 * By default, Mongoose adds an _id property to your schemas.
 */
const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    valid: {
      type: Boolean,
      default: true
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true // record creatAt time and updateAt time
  }
);

/**
 * Mongoose will refuse to save a document that doesn't have an _id
 */
const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;

export {
  SessionDocument
};