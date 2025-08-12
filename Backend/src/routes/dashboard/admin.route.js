import express from "express";
import {
    eventManagement,
    updateEventStatus
    } from "../../controllers/dashboard/admin.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Admin dashboard route
router.get("/events/event-management",verifyJWT,restrictTo("admin"),eventManagement);
router.patch("/events/update-Event-Status/:eventId",verifyJWT,restrictTo("admin"),updateEventStatus);



export default router;