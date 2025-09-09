import Event from "../../models/event.models.js";
import UserCancelledBooking from "../../models/userCancelledBookings.js";
import { User } from "../../models/user.model.js";
import Booking from "../../models/booking.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const eventManagement = async (req, res, next) => {
  try {
    const pendingEvents = await Event.find({ status: "PENDING" })
      .sort({ createdAt: -1 })
      .populate({
        path: "organizer",
        model: "User",
        select: "name email role",
      })
      .lean();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          pendingEvents,
          "Pending events retrieved successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const updateEventStatus = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { action, rejectionReason } = req.body; // action: "APPROVE" or "REJECT"

    if (!["APPROVED", "REJECTED"].includes(action)) {
      throw new ApiError(400, "Invalid action. Must be APPROVED or REJECTED.");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    event.status = action;

    if (action === "APPROVED") {
      event.isPublished = true;
      event.rejectionReason = undefined;
    } else if (action === "REJECTED") {
      if (!rejectionReason) {
        throw new ApiError(400, "Rejection reason is required");
      }
      event.isPublished = false;
      event.rejectionReason = rejectionReason;
    }

    await event.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          event,
          `Event ${action.toLowerCase()} successfully`
        )
      );
  } catch (error) {
    next(error);
  }
};

export const allAttendees = async (req, res, next) => {
  try {
    const users = await User.find({
      isVerified: true,
      role: "attendee",
      // isBanned: false,
    }).select("-password -otp -otpExpiration -refreshToken -isVerified");

    const userIds = users.map((u) => u._id);
    const cancellations = await UserCancelledBooking.aggregate([
      {
        $match: {
          userId: { $in: userIds },
        },
      },
      {
        $group: {
          _id: "$userId",
          totalCancelledBookings: { $sum: 1 },
        },
      },
    ]);

    const cancellationsMap = {};
    cancellations.forEach((e) => {
      cancellationsMap[e._id.toString()] = e.totalCancelledBookings;
    });

    const result = users.map((u) => ({
      ...u.toObject(),
      totalCancelledBookings: cancellationsMap[u._id.toString()] || 0,
    }));

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          result.length > 0
            ? "All verified attendees"
            : "No verified attendees found"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const allOrganizers = async (req, res, next) => {
  try {
    const users = await User.find({
      isVerified: true,
      role: "organizer",
      isBanned: false,
    }).select("-password -otp -otpExpiration -refreshToken -isVerified");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          users,
          users.length > 0
            ? "All verified organizers"
            : "No verified organizers found"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const allRejectedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: "REJECTED" }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          events,
          events.length > 0 ? "All rejected events" : "No rejected events found"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const allApprovedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: "APPROVED" }).sort({
      createdAt: -1,
    });

    const totalAttendees = events.map((e) => e._id);
    const totalRegisteredAttendees = await Event.aggregate([
      {
        $match: {
          _id: { $in: totalAttendees },
        },
      },
      {
        $group: {
          _id: "$_id",
          totalRegisteredAttendees: { $sum: 1 },
        },
      },
    ]);

    const attendeesMap = {};
    totalRegisteredAttendees.forEach((e) => {
      attendeesMap[e._id.toString()] = e.totalRegisteredAttendees;
    });

    const result = events.map((e) => ({
      ...e.toObject(),
      totalRegisteredAttendees: attendeesMap[e._id.toString()],
    }));

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          result.length > 0 ? "All approved events" : "No approved events found"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const allBannedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isBanned: true }).select(
      "-password -otp -otpExpiration -refreshToken -isVerified"
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          users,
          users.length > 0 ? "All banned users" : "No banned users found"
        )
      );
  } catch (error) {
    next(error);
  }
};
export const toggleBanStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { ban } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (typeof ban === "string") {
      ban = ban.toLowerCase() === "true";
    }

    if (typeof ban !== "boolean") {
      throw new ApiError(
        400,
        "Ban status is required and must be true or false"
      );
    }

    if (ban && user.isBanned) {
      throw new ApiError(400, "User already banned");
    }
    if (!ban && !user.isBanned) {
      throw new ApiError(400, "User not banned");
    }

    user.isBanned = ban;
    await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user,
          ban ? "User banned successfully" : "User unbanned successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};
