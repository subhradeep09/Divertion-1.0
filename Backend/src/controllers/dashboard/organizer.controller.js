import Event from "../../models/event.models.js";
import Booking from "../../models/booking.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createEvent = async (req, res,next) => {
  try {
    const {
      title,
      description,
      date,
      location,
      theme,
      isPublished = false,
      isPaid = false,
      price = 0,
    } = req.body;
    console.log(createEvent);

    if (!title || !date || !location) {
      throw new ApiError(400, "Title, date, and location are required");
    }
    if (isPaid && (typeof price !== "number" || price <= 0)) {
      throw new ApiError(
        400,
        "Price must be a positive number for paid events"
      );
    }
    const event = await Event.create({
      title,
      description,
      date,
      location,
      theme,
      isPublished,
      isPaid,
      price: isPaid ? price : 0,
      organizer: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, event, "Event created successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    console.log(req.params);
    const { eventId } = req.params;

    // Check if event exists and belongs to the logged-in organizer
    const event = await Event.findOne({
      _id: eventId,
      organizer: req.user._id,
    });
    if (!event) {
      throw new ApiError(404, "Event not found or unauthorized");
    }

    const {
      title,
      description,
      date,
      location,
      theme,
      isPublished,
      isPaid,
      price,
    } = req.body;

    // Validate if isPaid is true, price must be a valid number
    if (isPaid && (typeof price !== "number" || price <= 0)) {
      throw new ApiError(
        400,
        "Price must be a positive number for paid events"
      );
    }

    // Update only provided fields
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (location !== undefined) event.location = location;
    if (theme !== undefined) event.theme = theme;
    if (isPublished !== undefined) event.isPublished = isPublished;
    if (isPaid !== undefined) event.isPaid = isPaid;
    if (price !== undefined) event.price = isPaid ? price : 0;

    await event.save();

    return res
      .status(200)
      .json(new ApiResponse(200, event, "Event updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const viewUpcomingEvents = async (req, res, next) => {
  try {
    const organizerId = req.user._id;
    if (!organizerId) {
      throw new ApiError(404, "Organizer not found");
    }
    const upcomingEvents = await Event.find({
      organizer: organizerId,
      date: { $gte: new Date() },
    }).sort({ date: 1 });
    return res
      .status(200)
      .json(new ApiResponse(200, upcomingEvents, "Upcoming events"));
  } catch (error) {
    next(error);
  }
};

export const viewPastEvents = async (req, res,next) => {
  try {
    const organizerId = req.user._id;
    if (!organizerId) {
      throw new ApiError(404, "Organizer not found");
    }
    const pastEvents = await Event.find({
      organizer: organizerId,
      date: { $lt: new Date() },
    }).sort({ date: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, pastEvents, "Past events"));
  } catch (error) {
    next(error);
  }
};
export const deleteEvent = async (req, res,next) => {
  try {
    const { eventId } = req.params;
    const organizerId = req.user._id;

    if (!organizerId || !eventId) {
      console.log(organizerId, eventId);
      throw new ApiError(404, "Not found");
    }

    const event = await Event.findOneAndDelete({
      _id: eventId,
      organizer: organizerId,
    });

    if (!event) {
      throw new ApiError(404, "Event not found or unauthorized");
    }

    // Optionally delete related bookings
    await Booking.deleteMany({ event: event._id });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Event and associated bookings deleted successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};
