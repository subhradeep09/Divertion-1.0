import express from "express";
import {
    eventManagement,
    updateEventStatus,
    allAttendees,
    allOrganizers,
    allRejectedEvents,
    allApprovedEvents,
    toggleBanStatus,
    allBannedUsers
    } from "../../controllers/dashboard/admin.controller.js";
import {viewRegisteredAttendee} from "../../controllers/dashboard/organizer.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Admin dashboard route
router.get("/events/event-management",verifyJWT,restrictTo("admin"),eventManagement);
router.patch("/events/update-Event-Status/:eventId",verifyJWT,restrictTo("admin"),updateEventStatus);
router.get("/events/all-Attendees",verifyJWT,restrictTo("admin"),allAttendees);
router.get("/events/all-Organizers",verifyJWT,restrictTo("admin"),allOrganizers);
router.get("/events/all-Rejected-Events",verifyJWT,restrictTo("admin"),allRejectedEvents);  
router.get("/events/all-Approved-Events",verifyJWT,restrictTo("admin"),allApprovedEvents);
router.get("/events/view-registered-attendee/:eventId",verifyJWT,restrictTo("admin"),viewRegisteredAttendee);
router.patch("/users/toggle-Ban-Status/:userId",verifyJWT,restrictTo("admin"),toggleBanStatus);
router.get("/users/all-banned-users",verifyJWT,restrictTo("admin"),allBannedUsers);



export default router;