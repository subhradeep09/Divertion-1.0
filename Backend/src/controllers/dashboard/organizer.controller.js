import Event from "../../models/event.models.js";
import Booking from "../../models/booking.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      date,
      startTime,
      location,
      venueDetails,
      eventLink,
      theme,
    } = req.body;

    const isOnline = req.body.isOnline === "true";
    const isPublished = req.body.isPublished === "true";
    const isPaid = req.body.isPaid === "true";
    const capacity = parseInt(req.body.capacity) || 0;
    const price = parseInt(req.body.price) || 0;

    console.log("Parsed form data:", {
      ...req.body,
      isOnline,
      isPublished,
      isPaid,
      capacity,
      price,
    });

    // Validation
    if (!title || !date || !location || !startTime) {
      throw new ApiError(
        400,
        "Title, date, location, and startTime are required"
      );
    }

    if (isPaid && (isNaN(price) || price <= 0)) {
      throw new ApiError(
        400,
        "Price must be a positive number for paid events"
      );
    }

    if (isOnline && !eventLink) {
      throw new ApiError(400, "Event link is required for online events");
    }

    if (!req.file || !req.file.path) {
      throw new ApiError(400, "Banner image is required");
    }

    const imageUrl = req.file.path;

    const event = await Event.create({
      title,
      description,
      date,
      startTime,
      location,
      venueDetails,
      isOnline,
      eventLink: isOnline ? eventLink : "",
      capacity,
      bannerImage: imageUrl,
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
    const { eventId } = req.params;

    // Find the event belonging to the organizer
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
      startTime,
      location,
      venueDetails,
      isOnline,
      eventLink,
      capacity,
      bannerImage, // fallback if no file uploaded
      theme,
      isPublished,
      isPaid,
      price,
    } = req.body;

    // Get uploaded image from multer-cloudinary if provided
    const imageUrl = req.file?.path;

    // Validate price if isPaid is true
    if (isPaid && (typeof price !== "number" || price <= 0)) {
      throw new ApiError(
        400,
        "Price must be a positive number for paid events"
      );
    }

    // Validate eventLink if event is online
    if (isOnline && !eventLink) {
      throw new ApiError(400, "Event link is required for online events");
    }

    // Update fields conditionally
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (startTime !== undefined) event.startTime = startTime;
    if (location !== undefined) event.location = location;
    if (venueDetails !== undefined) event.venueDetails = venueDetails;
    if (isOnline !== undefined) event.isOnline = isOnline;
    if (eventLink !== undefined) event.eventLink = isOnline ? eventLink : "";
    if (capacity !== undefined) event.capacity = capacity;
    if (theme !== undefined) event.theme = theme;
    if (isPublished !== undefined) event.isPublished = isPublished;
    if (isPaid !== undefined) event.isPaid = isPaid;
    if (price !== undefined) event.price = isPaid ? price : 0;

    // Handle banner image update
    if (bannerImage !== undefined) event.bannerImage = bannerImage;
    if (imageUrl) event.bannerImage = imageUrl; // uploaded image takes priority

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

export const viewPastEvents = async (req, res, next) => {
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
export const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const organizerId = req.user._id;

    if (!organizerId || !eventId) {
      // console.log(organizerId, eventId);
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
