import { Router, Request, Response } from "express";
import { INewProduct, ProductController } from "../controllers/product";
import { verifyJWT } from "../middlewares/auth";
import { ICategory, IProduct } from "../models";
const router = Router();

router.post("/", [verifyJWT], async (req: Request, res: Response) => {
    const productController = new ProductController();
  
    try {
        const info: INewProduct = req.body;

        res.status(201).send({category: await productController.createProduct(info) })
    } catch (error) {
      throw error;
    }
});

router.get("/", [verifyJWT], async (req: Request, res: Response) => {
    const productController = new ProductController();
  
    try {
        const {productName, categoryName}: {productName: string, categoryName: string }  = req.body;

        res.status(200).send({category: await productController.filterProduct(productName, categoryName)})
    } catch (error) {
      throw error;
    }
});

router.put("/", [verifyJWT], async (req: Request, res: Response) => {
    const productController = new ProductController();
  
    try {
        const info : {product: IProduct, categories: Array<ICategory>} = req.body;

        res.status(200).send({category: await productController.associateCategory(info.categories, info.product)})
    } catch (error) {
      throw error;
    }
});
