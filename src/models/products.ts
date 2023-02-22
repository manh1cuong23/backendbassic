import mongoose, { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

import { IProduct } from "../interfaces/modles/product";

const ProductSchema = new Schema<IProduct>({
  name: { type: String },
  price: { type: Number },
});

const Product = model<IProduct>("ProductSchema", ProductSchema);
export default Product;
