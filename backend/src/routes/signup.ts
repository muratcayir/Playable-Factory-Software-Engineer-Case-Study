import express,{Request,Response} from 'express'
import jwt from 'jsonwebtoken';
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

declare module 'express-session' {
  interface SessionData {
    jwt?: string; 
  }
}

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ], validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("Email in use");
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_KEY!
      );

      res.status(201).send({ user, userJwt});
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(400).send({ error });
    }
  }
);


export { router as signupRouter };
