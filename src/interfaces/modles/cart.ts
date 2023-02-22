import { ObjectId } from "mongoose";

export interface ICart {
  _id: ObjectId;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
