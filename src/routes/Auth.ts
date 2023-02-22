import { Router } from "express";
import Register from "../controllers/Auth/register";
import Login from "../controllers/Auth/login";
import RefreshToken from "../controllers/Auth/refreshToken";
export const authRouter = Router();

authRouter.post("/singup", Register.perform);
authRouter.post("/login", Login.perform);
authRouter.post("/refreshToken", RefreshToken.perform);
authRouter.post("/refreshToken", RefreshToken.perform);
