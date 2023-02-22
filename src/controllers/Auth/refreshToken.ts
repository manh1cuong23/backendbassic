import { Request } from "express";
import * as jwt from "jsonwebtoken";
import User, { IUserModel } from "../../models/user";
import { Error } from "mongoose";
import { IUser } from "../../interfaces/modles/user";
require("dotenv").config();

class RefreshToken {
  public static getToken(req: Request): string {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token as string;
    }

    return "";
  }
  public static perform(req: Request, res: any): any {
    const token = RefreshToken.getToken(req);
    if (token === "") {
      return res.json({
        error: ["Invalid Token!"],
      });
    }
    const decode = jwt.verify(
      token,
      process.env.KEY_TOKEN as string,
      function (err, decoded: any) {
        if (err) {
          return res.status(400).json({ message: "err token" });
        }
        User.findOne(
          { email: decoded.email },
          (err: Error, user: IUserModel) => {
            if (err) {
              return res.status(400).json({ message: err.message });
            }
            if (!user) {
              return res.status(401).json({
                error: ["User not found!"],
              });
            }
            user.comparePassword(decoded.password, (err: any, isMatch: any) => {
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
              const token = jwt.sign(
                {
                  email: decoded.email,
                  password: decoded.password,
                },
                process.env.KEY_TOKEN as any,
                {
                  expiresIn:
                    parseInt(process.env.JWT_EXPIRES_IN as string) * 60,
                }
              );
              user.password = "";
              return res.status(200).json({
                message: "Success",
                token,
                token_expires_in:
                  parseInt(process.env.JWT_EXPIRES_IN as string) * 60,
              });
            });
          }
        );
      }
    );
  }
}
export default RefreshToken;
