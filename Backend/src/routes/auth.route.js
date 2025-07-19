import express from 'express';
import { registerUser,verifyOtp, loginUser,logoutUser, resendOtp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
// router.post('/login', loginUser);
// router.post('/logout', logoutUser);
router.post('/resend-otp', resendOtp);

export default router;