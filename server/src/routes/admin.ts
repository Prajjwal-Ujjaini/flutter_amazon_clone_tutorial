import express, { Request, Response } from "express";
import { AddProductRequestData } from "../common/interfaces/types";
import { Product } from "../models/product";
import { admin } from "../middlewares/adminMiddleware";
import { Order } from "../models/order";

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

      // console.log(products);

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

adminRouter.get("/admin/get-orders", admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

adminRouter.post("/admin/change-order-status", admin, async (req, res) => {
  try {
    const { id, status } = req.body;
    let order = await Order.findById(id);
    order!.status = status;
    order = await order!.save();
    res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    let totalEarnings = 0;

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        totalEarnings +=
          orders[i].products[j].quantity * orders[i].products[j].product!.price;
      }
    }
    // CATEGORY WISE ORDER FETCHING
    let mobileEarnings = await fetchCategoryWiseProduct("Mobiles");
    let essentialEarnings = await fetchCategoryWiseProduct("Essentials");
    let applianceEarnings = await fetchCategoryWiseProduct("Appliances");
    let booksEarnings = await fetchCategoryWiseProduct("Books");
    let fashionEarnings = await fetchCategoryWiseProduct("Fashion");

    let earnings = {
      totalEarnings,
      mobileEarnings,
      essentialEarnings,
      applianceEarnings,
      booksEarnings,
      fashionEarnings,
    };

    res.json(earnings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

async function fetchCategoryWiseProduct(category: string) {
  let earnings = 0;
  let categoryOrders = await Order.find({
    "products.product.category": category,
  });

  for (let i = 0; i < categoryOrders.length; i++) {
    for (let j = 0; j < categoryOrders[i].products.length; j++) {
      earnings +=
        categoryOrders[i].products[j].quantity *
        categoryOrders[i].products[j].product!.price;
    }
  }
  return earnings;
}
