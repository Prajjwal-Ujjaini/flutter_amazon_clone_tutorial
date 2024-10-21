import express, { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { auth } from "../middlewares/authMiddleware";
import { SignUpRequestData } from "../common/interfaces/types";

export const authRouter = express.Router();
// SIGN UP
authRouter.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const reqData: SignUpRequestData = req.body;

    const existingUser = await User.findOne({ email: reqData.email });
    if (existingUser) {
      res.status(400).json({ msg: "User with same email already exists!" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(reqData.password, 8);

    let user = new User({
      email: reqData.email,
      password: hashedPassword,
      name: reqData.name,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

// Sign In Route
// Exercise
authRouter.post("/api/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "User with this email does not exist!" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Incorrect password." });
      return;
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user.toObject() });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

authRouter.post("/tokenIsValid", async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.json(false);
      return;
    }

    const verified = jwt.verify(token, "passwordKey") as JwtPayload | string;

    // Check if verified is a string (indicating an error) or does not have 'id'
    if (typeof verified === "string" || !verified.id) {
      res.json(false);
      return;
    }

    const user = await User.findById(verified.id);
    if (!user) {
      res.json(false);
      return;
    }
    res.json(true);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});

// get user data
// authRouter.get("/", auth, async ((req: Request, res: Response) => {
//   const user = await User.findById(req.user);
//   res.json({ ...user._doc, token: req.token });
// });

authRouter.get("/", auth, async (req: Request, res: Response) => {
  // console.log("get called ");
  try {
    const userId = (req as Request & { user?: string }).user;
    const token = (req as Request & { token?: string }).token;

    if (!userId) {
      res.status(401).json({ msg: "User not found" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.json({ ...user.toObject(), token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
});
