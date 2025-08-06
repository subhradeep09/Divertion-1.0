import express from "express";
import {
  createEvent,
  updateEvent,
  viewUpcomingEvents,
  viewPastEvents,
  deleteEvent
} from "../../controllers/dashboard/organizer.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js"; 

const router = express.Router();

// Organizer dashboard route
router.post("/events",verifyJWT,restrictTo("organizer"),upload.single("bannerImage"),createEvent);
router.put("/events/:eventId",verifyJWT,restrictTo("organizer"),upload.single("bannerImage"), updateEvent);
router.get("/events/upcoming",verifyJWT,restrictTo("organizer"),viewUpcomingEvents);
router.get("/events/past",verifyJWT,restrictTo("organizer"),viewPastEvents);
router.delete("/events/:eventId",verifyJWT,restrictTo("organizer"),deleteEvent);

export default router;
