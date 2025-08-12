
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import adminDashboardRouter from "./routes/dashboard/admin.route.js";
import organizerDashboardRouter from "./routes/dashboard/organizer.route.js";
// import userDashboardRouter from "./routes/dashboard/user.route.js";
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());



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
app.use('/api/v1/dashboard/admin', adminDashboardRouter);
app.use('/api/v1/dashboard/organizer', organizerDashboardRouter);
// app.use('/api/v1/dashboard/user', userDashboardRouter);


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