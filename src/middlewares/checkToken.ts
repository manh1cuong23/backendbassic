require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function checkToken(req: any, res: Response, next: NextFunction) {
  console.log("vao day roi");
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(
      token,
      process.env.KEY_TOKEN as string,
      function (err: any, decoded: any): any {
        if (err) {
          return res.status(400).json({ message: "err token" });
        }
        console.log("decoded", decoded);
        req.userId = decoded.id;
        req.email = decoded.email;
        next();
      }
    );
  } else {
    return res.status(401).send({ message: "err Token" });
  }
}
