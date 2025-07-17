import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
// import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit : '16kb'}));
app.use(express.static('public'));
// app.use(cookieParser());

//routes import

app.use('/api/v1/auth', authRouter);





app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    data: null,
  })
})

app.use(errorHandler)
export {app}