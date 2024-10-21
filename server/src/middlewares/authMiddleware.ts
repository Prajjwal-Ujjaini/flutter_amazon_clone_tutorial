import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    // console.log(`token = ${token}`);
    if (!token) {
      res.status(401).json({ msg: "No auth token, access denied" });
      return;
    }

    const verified = jwt.verify(token, "passwordKey") as JwtPayload;
    if (!verified) {
      res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
      return;
    }

    // req.user = verified.id;
    // req.token = token;

    (req as Request & { user?: string; token?: string }).user = verified.id; // Assuming verified.id is a string
    (req as Request & { user?: string; token?: string }).token = token;

    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
};