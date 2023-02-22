import mongoose, { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

import { ICart } from "../interfaces/modles/cart";

const CartSchema = new Schema<ICart>(
  {
    productId: { type: String, require: true },
    userId: { type: String, require: true },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const Cart = model<ICart>("Cart", CartSchema);
export default Cart;
