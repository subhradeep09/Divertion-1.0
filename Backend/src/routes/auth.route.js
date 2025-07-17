import express from 'express';
import { registerUser,verifyOtp, loginUser,logoutUser, resednOtp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
// router.post('/verify-otp', verifyOtp);
// router.post('/login', loginUser);
// router.post('/logout', logoutUser);
// router.post('/resend-otp', resednOtp);

export default router;