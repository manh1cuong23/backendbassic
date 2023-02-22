import { NextFunction, Request, Response } from "express";
import User, { IUserModel } from "../../models/user";
import { IUser } from "../../interfaces/modles/user";
import { Error } from "mongoose";
import * as jwt from "jsonwebtoken";
require("dotenv").config();
class Login {
  public static perform(req: Request, res: Response, next: NextFunction) {
    // console.log("check env", process.env.KEY_TOKEN);
    // return res.json({
    //   messagge: "hello",
    // });
    if (!req.body.email || !req.body.password) {
      return res.status(403).json({
        message: "Please enter email or password",
      });
    }
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = User.findOne(
        { email: email },
        (err: Error, user: IUserModel) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          if (!user) {
            return res.status(401).json({
              error: ["User not found!"],
            });
          }
          user.comparePassword(password, (err: any, isMatch: any) => {
            if (err) {
              return res.status(403).json({
                message: "err",
              });
            }
            if (!isMatch) {
              return res.status(403).json({
                message: "Password not correct",
              });
            }
            console.log("d", process.env.JWT_EXPIRES_IN);
            const token = jwt.sign(
              {
                email: email,
                id: user._id,
              },
              process.env.KEY_TOKEN as any,
              { expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string) * 60 }
            );
            user.password = "";
            console.log("user", user);
            return res.status(200).json({
              message: "Success",
              idUser: user._id,
              token,
              token_expires_in:
                parseInt(process.env.JWT_EXPIRES_IN as string) * 60,
            });
          });
        }
      );
    } catch (err) {
      res.status(402).json(err);
    }
  }
}
export default Login;
