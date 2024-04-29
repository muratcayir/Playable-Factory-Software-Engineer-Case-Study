import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next();
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    // Hata istemciye iletiliyor
    res.status(401).send({ error: 'Unauthorized' });
  }
};


