import { IUser, userModel } from "../models";
import * as bcrypt from "bcrypt";

export interface INewUser {
  name: string;
  username: string;
  password: string;
}

export class UserController {
  async createUser(user: INewUser): Promise<string> {
    try {
      const cryptedPassword = await bcrypt.hash(user.password, 10);
      const [insertedUser] = await userModel.insertMany([
        { ...user, password: cryptedPassword },
      ]);

      return insertedUser.name;
    } catch (error) {
      throw new Error("Não foi possível cadastrar novo usuário.");
    }
  }

  async login(username: string, password: string): Promise<IUser> {
    try {
      const [user] = await userModel.find({ username });

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Não encontrado.");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

}
