import Event from "../../models/event.models.js";
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
                select: "name email role"  
            })
            .lean();

        return res.status(200).json(
            new ApiResponse(200, pendingEvents, "Pending events retrieved successfully")
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

    return res.status(200).json(
      new ApiResponse(200, event, `Event ${action.toLowerCase()} successfully`)
    );
  } catch (error) {
    next(error);
  }
};
//approvalRejection
