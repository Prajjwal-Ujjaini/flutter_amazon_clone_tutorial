import express, { Request, Response } from "express";
import { Product } from "../models/product";
import { auth } from "../middlewares/authMiddleware";
import { User } from "../models/user";
import { Order } from "../models/order";
import { Types } from "mongoose";

export const userRouter = express.Router();

userRouter.post("/api/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    const userId = (req as Request & { user?: string }).user;
    let user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if ((user.cart[i]!.product as any)._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          (productt!.product as any)._id.equals(product._id)
        );
        producttt!.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

userRouter.delete("/api/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    const userId = (req as Request & { user?: string }).user;
    let user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    for (let i = 0; i < user.cart.length; i++) {
      if ((user.cart[i]!.product as any)._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }

    user = await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

userRouter.post("/api/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;

    const userId = (req as Request & { user?: string }).user;
    let user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

userRouter.post("/api/order", auth, async (req, res) => {
  try {
    const { cart, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product!.quantity >= cart[i].quantity) {
        product!.quantity -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product!.save();
      } else {
        res.status(404).json({ msg: `${product!.name} is out of Stock! ` });
        return;
      }
    }

    const userId = (req as Request & { user?: string }).user;
    let user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    (user.cart as Types.DocumentArray<(typeof user.cart)[number]>).splice(0);
    user = await user.save();

    let order = new Order({
      products,
      totalPrice,
      address,
      userId,
      orderedAt: new Date().getTime(),
    });

    order.save();
    res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

userRouter.get("/api/orders/me", auth, async (req, res) => {
  try {
    const userId = (req as Request & { user?: string }).user;

    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});
