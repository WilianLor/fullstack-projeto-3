import { model, Schema } from "mongoose";
import { IUser } from "./user.schema";

export interface IDomain {
  _id?: string;
  user: IUser;
  domain: string;
  createdAt: Date;
}

const domainSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  { _id: true }
);

const Domain = model<IDomain>("Domain", domainSchema);

export default Domain;
