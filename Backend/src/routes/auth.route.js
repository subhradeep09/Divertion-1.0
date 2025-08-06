import express from 'express';
import { registerUser,verifyOtp, loginUser,logoutUser, resendOtp,refreshAccessToken } from '../controllers/auth.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/logout',verifyJWT, logoutUser);
router.post('/resend-otp', resendOtp);
router.post("/refresh-token",refreshAccessToken)

export default router;