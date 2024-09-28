import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import  userRouter  from "./router/useRouter.js";
import  jobRouter  from "./router/jobRouter.js";

const app = express();
config({path:"./config/config.env"});

// frontend and backend connection
// app.use ko use karne ka mtlb h ki hum cors ko as a middleware use kar rhe h
// It allows the server to accept requests from the specified frontend URL (process.env.FRONTEND_URL), 
// supports specific HTTP methods (GET, POST, PUT, DELETE), 
// and allows credentials like cookies to be sent.
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
// during login or register token generated so to access
// it in the backend we use cookieParser
app.use(cookieParser());

// middlewares-> to check which type of the data is their
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);

connection();
app.use(errorMiddleware);

export default app;