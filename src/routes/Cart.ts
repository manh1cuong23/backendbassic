import { Router } from "express";
import handleCart from "../controllers/Api/handleCart";
import Login from "../controllers/Auth/login";
import { checkToken } from "../middlewares/checkToken";
export const cartRouter = Router();

cartRouter.post("/create/:productId", checkToken, handleCart.createCart);
cartRouter.get("/getCart", checkToken, handleCart.getCartByUser);
