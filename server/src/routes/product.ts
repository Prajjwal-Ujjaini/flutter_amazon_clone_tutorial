import express, { Request, Response } from "express";
import { Product } from "../models/product";
import { admin } from "../middlewares/adminMiddleware";
import { auth } from "../middlewares/authMiddleware";

export const productRouter = express.Router();

productRouter.get(
  "/api/products",
  auth,
  async (req: Request, res: Response) => {
    console.log("get products called ");
    console.log(`category : ${req.query.category}`);
    try {
      const products = await Product.find({ category: req.query.category });

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

productRouter.get(
  "/api/products/search/:name",
  auth,
  async (req: Request, res: Response) => {
    console.log("get products called ");
    console.log(`search : ${req.params.search}`);
    try {
      const products = await Product.find({
        name: { $regex: req.params.name, $options: "i" },
      });

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
