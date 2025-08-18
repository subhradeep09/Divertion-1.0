import express from "express";
import {
  viewEvents,
  bookEvents,
  upcomingBookedEvents,
  bookingHistory,
  cancelBooking
} from "../../controllers/dashboard/user.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js"; 

const router = express.Router();

// User dashboard route
router.get("/events/view-Events",verifyJWT,restrictTo("attendee"),viewEvents);
router.post("/events/book-events/:eventId",verifyJWT,restrictTo("attendee"), bookEvents);
router.get("/events/upcoming-Booked-Events",verifyJWT,restrictTo("attendee"),upcomingBookedEvents);
router.get("/events/booking-History",verifyJWT,restrictTo("attendee"),bookingHistory);
router.delete("/events/cancel-booking/:bookingId",verifyJWT,restrictTo("attendee"),cancelBooking);

export default router;