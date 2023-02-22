import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import handelProduct from "../controllers/Api/handelProduct";
export const productRouter = Router();

productRouter.post("/create", checkToken, handelProduct.createProduct);
productRouter.post("/update/:id", checkToken, handelProduct.updatedProduct);
productRouter.delete("/delete/:id", checkToken, handelProduct.deleteProduct);
// productRouter.get("/getAllProducts", handelProduct.getAllProduct);
