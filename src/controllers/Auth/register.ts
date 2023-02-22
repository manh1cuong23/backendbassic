/**
 * Handles your register route
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import User from "../../models/user";
import emailvalidator from "email-validator";

import { IRequest, IResponse, INext } from "../../interfaces/vendors";
import { NextFunction, Request, Response } from "express";
import IUser from "../../../../express-typescript/src/interfaces/models/user";
class Register {
  // static perform: RequestHandler<{}, any, any, Record<string, any>>;
  public static show(req: IRequest, res: IResponse): any {
    return res.render("pages/signup", {
      title: "SignUp",
    });
  }

  public static perform(req: Request, res: Response, next: NextFunction): any {
    console.log("body", req.body);
    if (!req.body?.email || !req.body?.password) {
      return res.status(400).json({
        message: "err",
      });
    }
    if (!emailvalidator.validate(req.body?.email)) {
      return res.status(400).json({
        message: "email not correct",
      });
    }
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName ? req.body.fullName : "",
        gender: req.body.gender ? req.body.gender : "",
      });

      User.findOne(
        { email: req.body.email },
        (err: any, existingUser: IUser) => {
          if (err) {
            return next(err);
          }

          if (existingUser) {
            return res.status(402).json({
              message: "ivalid user",
            });
          }

          user.save((err) => {
            if (err) {
              return next(err);
            }
            return res.status(200).json({
              message: "success",
            });
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default Register;
