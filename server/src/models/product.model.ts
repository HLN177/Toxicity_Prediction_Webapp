import mongoose from "mongoose"; 
import {customAlphabet} from 'nanoid';
import { UserDocument } from "./user.model";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

/**
 * create a typescript definition for user schema
 */
interface ProductDocument extends mongoose.Document {
  user: UserDocument['_id'];
  productId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true // record creatAt time and updateAt time
  }
);


const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;

export {
  ProductDocument
};