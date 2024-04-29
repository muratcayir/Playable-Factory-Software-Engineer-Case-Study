import express from "express";
import "express-async-errors";
import cookieSession from 'cookie-session';
import cors from 'cors'
import { currentUserRouter } from "./routes/current-user";
import loaders from './loaders'
import {initializeConfig} from './config'
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { todoRouter } from "./routes/todos";


initializeConfig();
loaders();
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(todoRouter)

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);


const start = async () => {

  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  app.listen(process.env.APP_PORT, () => {
    console.log(`App started on port ${process.env.APP_PORT}`);
  });
};

start()
export {app}