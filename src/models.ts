import { Document, createConnection, set } from "mongoose";
const { NODE_ENV } = process.env;
import config from "./config";
import * as s from "./schemas";

export const mongoOptions = config.MONGO_OPTIONS;

const uri = config.DB_URI;

export let conn = createConnection(uri!, mongoOptions);

conn.on("error", console.log.bind(console, "Erro ao conectar"));
conn.once("open", console.log.bind(console, "Conexão estabelecida"));

set("useCreateIndex", true);

export interface IUser extends Document {
  username: string;
  name: string;
  password: string;
}

export interface ICategory extends Document {
  name: string;
  description: string;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  categories: Array<ICategory>;
}

export const userModel = conn.model<IUser>("users", s.userSchema);
export const categoryModel = conn.model<ICategory>("categories", s.categorySchema)
export const productModel = conn.model<IProduct>("products", s.productSchema)
