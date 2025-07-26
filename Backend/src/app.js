// import express from "express";
// import cors from "cors";
// import authRouter from "./routes/auth.route.js";
// import errorHandler from "./utils/errorHandler.js";


// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// app.use(express.json({limit: '16kb'}));
// app.use(express.urlencoded({extended: true, limit : '16kb'}));
// app.use(express.static('public'));


// //routes import

// app.use('/api/v1/auth', authRouter);





// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Not Found",
//     data: null,
//   })
// })

// app.use(errorHandler)
// export {app}

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

// CORS Configuration - simplified first to get it working
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));

// Routes - make sure this comes AFTER all middleware
app.use('/api/v1/auth', authRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        data: null,
    });
});

// Error Handler
app.use(errorHandler);

export { app };