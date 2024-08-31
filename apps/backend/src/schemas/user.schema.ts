import { model, Schema } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { _id: true }
);

const User = model<IUser>("User", userSchema);

export default User;
