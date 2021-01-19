import { Schema, Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const userSchema = new Schema(
  {
    _id: ObjectId,
    name: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { collection: "users", versionKey: false }
);
