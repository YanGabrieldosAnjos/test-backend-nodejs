import { ICategory, categoryModel } from "../models";

export interface INewCategory {
    name: string;
    description: string;
};

export class CategoryController {

    async createCategory(info: INewCategory): Promise<string> {
        try {
            const categoryInserted = await categoryModel.insertMany({...info});
            return categoryInserted.name; 
        } catch(error) {
            throw new Error(`Não foi possível cadastrar categoria. ${error}.`);
        }
    }

    async getCategoryByName(name: string): Promise<ICategory | null> {
        try {
            return categoryModel.findOne({name});
        } catch(error) {
            throw new Error (`Não foi possível encontrar categoria. ${error}.`);
        }
    }

    async updateCategory(category: ICategory): Promise<INewCategory> {
        try {
            await categoryModel.updateOne({_id: category._id}, category);
            return {...category};
        } catch(error) {
            throw new Error(`Não foi possível atualizar categoria ${error}.`)
        }
    }
}