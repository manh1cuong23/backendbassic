import mongoose, { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

import { IUser } from "../interfaces/modles/user";
export interface IUserModel extends IUser, mongoose.Document {
  comparePassword(password: string, cb: any): string;
}
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String },
  gender: { type: String },
});
UserSchema.pre("save", function (_next): void {
  console.log("hello");
  const user = this;

  bcrypt.genSalt(10, (_err, _salt) => {
    if (_err) {
      return _next();
    }
    bcrypt.hash(user.password, _salt, null, (_err, _hash) => {
      if (_err) {
        return _next();
      }
      user.password = _hash;
      return _next();
    });
  });
  console.log("Create user ok "); // TypeScript knows that `this` is a `mongoose.Document & User` by default
});
// custumor method
UserSchema.methods.comparePassword = function (
  _requestPassword: string,
  _cb: (arg0: Error | null, arg1: boolean | undefined) => void
): any {
  bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
    _cb(_err, _isMatch);
  });
};
const User = model<IUserModel>("User", UserSchema);
export default User;
