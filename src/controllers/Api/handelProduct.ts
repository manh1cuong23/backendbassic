import { NextFunction, Request, Response } from "express";
import Product from "../../models/products";
import { IProduct } from "../../interfaces/modles/product";

require("dotenv").config();
class handelProduct {
  public static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body.name || !req.body.price) {
      return res.status(402).json({ message: "Plese enter full fields" });
    }
    try {
      const price = req.body.price;
      const name = req.body.name;
      const newProduct = new Product({
        name: name,
        price: price,
      });
      await newProduct.save();
      return res
        .status(200)
        .json({ message: "Product created", newPr: newProduct });
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  public static async updatedProduct(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(404).json({ message: "Please enter id product" });
    }
    if (!req.body.name || !req.body.price) {
      return res.status(404).json({ message: "please enter field update" });
    }
    const name = req.body.name;
    const price = req.body.price;
    try {
      console.log("vao day r");
      let productUpdated = await Product.updateOne(
        {
          _id: req.params.id,
        },
        { name: name, price: price },
        { new: true }
      );
      if (!productUpdated) {
        return res.status(401).json({ message: "No invalid products" });
      }
      res
        .status(200)
        .json({ message: "success", productUpdate: productUpdated });
    } catch (err) {}
  }
  public static async deleteProduct(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(404).json({ message: "Please enter id product" });
    }
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(202).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.log(err);
    }
  }
}
export default handelProduct;
