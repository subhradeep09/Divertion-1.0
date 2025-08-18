import express from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";
import {profile} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile',verifyJWT,restrictTo("admin","organizer","attendee"),profile);

export default router;
