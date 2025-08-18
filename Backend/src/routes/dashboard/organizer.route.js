import express from "express";
import {
  createEvent,
  updateEvent,
  viewUpcomingEvents,
  viewPastEvents,
  deleteEvent,
  eventStatus,
  viewToEditEvents
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
router.get("/events/event-status",verifyJWT,restrictTo("organizer"),eventStatus);
router.get("/events/pending-Edit",verifyJWT,restrictTo("organizer"),viewToEditEvents);

export default router;
