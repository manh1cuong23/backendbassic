import { Response } from "express";
import { IRequest } from "../../interfaces/vendors";
import Cart from "../../models/carts";
import mongoose from "mongoose";

require("dotenv").config();
class handleCart {
  public static async createCart(req: IRequest, res: Response) {
    if (!req.params.productId || !req.body.quantity) {
      return res.status(404).json({ message: "please enter full field " });
    }
    console.log(req.userId);
    const userId = new mongoose.Types.ObjectId(req.userId);
    const productId = new mongoose.Types.ObjectId(req.params.productId);
    console.log("userId", typeof userId);
    try {
      const newCart = new Cart({
        userId: userId,
        productId: productId,
        quantity: req.body.quantity,
      });
      await newCart.save();
      res.status(202).json({ message: "ok", newCart: newCart });
    } catch (err) {
      console.log(err);
    }
  }
  public static async getCartByUser(req: IRequest, res: Response) {
    try {
      const listCart = await Cart.aggregate([
        { $match: { userId: req.userId } },
        { $project: { productObjId: { $toObjectId: "$productId" } } },
        {
          $lookup: {
            from: "productschemas",
            localField: "productObjId",
            foreignField: "_id",
            as: "data products",
          },
        },
      ]);
      return res.status(200).json(listCart);
    } catch (err) {
      console.log(err);
    }
  }
}
export default handleCart;
