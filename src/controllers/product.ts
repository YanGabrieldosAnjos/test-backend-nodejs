import { ICategory, IProduct, productModel } from "../models";

export interface INewProduct {
    title: string;
    price: number;
    description: string;
}
export class ProductController {

    async createProduct(info: INewProduct){
        try {
            const productInserted = await productModel.insertMany({...info});
            return productInserted.title; 
        } catch(error) {
            throw new Error(`Não foi possível cadastrar produto. ${error}.`);
        }
    }

    async associateCategory(categories: Array<ICategory>, product: IProduct): Promise<Array<ICategory>>{
        try {
            await productModel.updateOne({_id: product._id}, {categories});
            return categories;
        } catch(error) {
            throw new Error(`Não foi possível associar categorias a um produto. ${error}.`);
        }
    }

    async filterProduct(productName: string | undefined, categoryName: string| undefined): Promise<Array<IProduct>>{
        try {
            const query = productModel.find();
            if(productName){
                query.find({title: productName});
            }
            if(categoryName){
                query.populate({
                    path: "categories",
                    match: {name: categoryName}
                });
            }
            return query;
        } catch(error) {
            throw new Error(`Não foi possível filtrar produto. ${error}.`);
        }
    }
}