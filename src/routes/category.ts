import { Router, Request, Response } from "express";
import { INewCategory, CategoryController } from "../controllers/category";
import * as jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth";
import { ICategory } from "../models";
const router = Router();

router.post("/", [verifyJWT], async (req: Request, res: Response) => {
    const categoryController = new CategoryController();
  
    try {
        const info: INewCategory = req.body;

        res.status(201).send({category: await categoryController.createCategory(info) })
    } catch (error) {
      throw error;
    }
});

router.get("/", [verifyJWT], async (req: Request, res: Response) => {
    const categoryController = new CategoryController();
  
    try {
        const name: string  = req.body;

        res.status(200).send({category: await categoryController.getCategoryByName(name)})
    } catch (error) {
      throw error;
    }
});

router.put("/", [verifyJWT], async (req: Request, res: Response) => {
    const categoryController = new CategoryController();
  
    try {
        const info: ICategory = req.body;

        res.status(200).send({category: await categoryController.updateCategory(info)})
    } catch (error) {
      throw error;
    }
});
