import express, { Request, Response } from "express";
import { AddProductRequestData } from "../common/interfaces/types";
import { Product } from "../models/product";
import { admin } from "../middlewares/adminMiddleware";

export const adminRouter = express.Router();
// SIGN UP
adminRouter.post(
  "/admin/add-product",
  admin,
  async (req: Request, res: Response) => {
    try {
      const reqData: AddProductRequestData = req.body;

      let product = new Product({
        name: reqData.name,
        description: reqData.description,
        quantity: reqData.quantity,
        images: reqData.images,
        category: reqData.category,
        price: reqData.price,
      });

      product = await product.save();
      res.json(product);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }
);

adminRouter.get(
  "/admin/get-products",
  admin,
  async (req: Request, res: Response) => {
    console.log("get products called ");
    try {
      const products = await Product.find({});

      console.log(products);

      res.json(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }
);

adminRouter.post(
  "/admin/delet-products",
  admin,
  async (req: Request, res: Response) => {
    // console.log("get called ");
    try {
      const { id } = req.body;
      let product = await Product.findOneAndDelete(id);
      // product = await product!.save();
      res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }
);
