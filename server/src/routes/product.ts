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

productRouter.post(
  "/api/rate-product",
  auth,
  async (req: Request, res: Response) => {
    const userId = (req as Request & { user?: string }).user;
    try {
      const { id, rating } = req.body;
      let product = await Product.findById(id);

      for (let i = 0; i < product!.ratings.length; i++) {
        if (product?.ratings[i].userId == userId) {
          product?.ratings.splice(i, 1);
          break;
        }
      }
      const ratingSchema = {
        userId,
        rating,
      };
      product!.ratings.push(ratingSchema);
      product = await product!.save();

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

productRouter.get(
  "/api/deal-of-day",
  auth,
  async (req: Request, res: Response) => {
    try {
      let products = await Product.find({});
      products = products.sort((a, b) => {
        let aSum = 0;
        let bSum = 0;
        for (let i = 0; i < a.ratings.length; i++) {
          aSum += a.ratings[i].rating;
        }
        for (let i = 0; i < b.ratings.length; i++) {
          bSum += b.ratings[i].rating;
        }
        return aSum < bSum ? 1 : -1;
      });

      res.json(products[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }
);
