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

export const categorySchema = new Schema(
  {
    _id: ObjectId,
    name: {
      type: String,
      unique: true,
    },
    description: String
  },
  { collection: "categories", versionKey: false }
);

export const productSchema = new Schema(
  {
    _id: ObjectId,
    name: {
      type: String,
      unique: true,
    },
    description: String,
    price: Number,
    categories: [{
      type: ObjectId,
      ref: "categories",

    }],
  },
  {collection: "products", versionKey: false}
)