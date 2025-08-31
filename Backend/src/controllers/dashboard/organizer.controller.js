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
    const isPaid = req.body.isPaid === "true";
    const capacity = parseInt(req.body.capacity) || 0;
    const price = parseInt(req.body.price) || 0;


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
      isPaid,
      price: isPaid ? price : 0,
      organizer: req.user._id,

      status: "PENDING", 
      isPublished: false
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

    let {
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
      isPaid,
      price,
    } = req.body;

    // Parse booleans
    if (isOnline !== undefined) {
      isOnline = isOnline === "true" || isOnline === true;
    }
    if (isPaid !== undefined) {
      isPaid = isPaid === "true" || isPaid === true;
    }
    capacity = capacity ? parseInt(capacity, 10) : undefined;
    price = price ? parseInt(price) : undefined;

    const imageUrl = req.file?.path;

    // Validate inputs
    if (isPaid && (typeof price !== "number" || price <= 0)) {
      throw new ApiError(400, "Price must be a positive number for paid events");
    }

    if (isOnline && !eventLink) {
      throw new ApiError(400, "Event link is required for online events");
    }

    if (event.status === "PENDING") {

      if (title !== undefined) event.title = title;
      if (description !== undefined) event.description = description;
      if (date !== undefined) event.date = date;
      if (startTime !== undefined) event.startTime = startTime;
      if (theme !== undefined) event.theme = theme;
      if (isPaid !== undefined) event.isPaid = isPaid;
      if (price !== undefined) {
        if(isPaid || event.price) event.price = price;
        else {
          event.price = 0;
        }
      }
    } else if (event.status === "APPROVED") {
      if (title || description || date || startTime || theme || isPaid !== undefined || price !== undefined || location || venueDetails) {
        throw new ApiError(403, "You cannot edit these fields after approval. Contact admin for changes.");
      }
    }

    if (isOnline !== undefined) event.isOnline = isOnline;
    if (eventLink !== undefined) event.eventLink = isOnline ? eventLink : "";
    if (capacity !== undefined) event.capacity = capacity;
    if (bannerImage !== undefined) event.bannerImage = bannerImage;
    if (imageUrl) event.bannerImage = imageUrl;

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
      isPublished: true,
      status: "APPROVED",
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
      isPublished: true,
      status: "APPROVED",
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

export const eventStatus = async (req, res, next) => {
  try {
    const organizerId = req.user?._id;
    // console.log("I am inside event-status");
    if (!organizerId) {
      throw new ApiError(404, "Organizer not found");
    }

    // Fetch all events created by this organizer
    const events = await Event.find({ organizer: organizerId })
      .select("title date status rejectionReason createdAt updatedAt")
      .sort({ createdAt: -1 });

    // Format response to ensure rejectionReason only appears if rejected
    const eventHistory = events.map(event => ({
      _id: event._id,
      title: event.title,
      date: event.date,
      status: event.status,
      rejectionReason: event.status === "REJECTED" ? event.rejectionReason : null,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, eventHistory, "Event request history retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const viewToEditEvents = async (req, res, next) => {
  try {
    const organizerId = req.user._id;
    if (!organizerId) {
      throw new ApiError(404, "Organizer not found");
    }
    const toEditEvents = await Event.find({
      organizer: organizerId,
      isPublished: false,
      status: "PENDING",
    }).sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, toEditEvents, "To edit events"));
  } catch (error) {
    next(error);
  }
};

export const viewRegisteredAttendee = async(req,res,next) => {
  try{
    const {eventId} = req.params;
    if(!eventId)
      throw new ApiError(404,"Event id not sent");
    const userId = req.user._id;
    if(!userId)
      throw new ApiError(404,"Unauthorized Request");

    const eventDetail = await Event.findOne({_id:eventId, organizer:userId});
    if(!eventDetail)
      throw new ApiError(404,"No Event is Found");
    const registeredAttendees = await Booking.find({event:eventId, paymentStatus: { $in: ["SUCCESS", "FREE"] }})
    .populate({
      path : "user",
      select : "username fullname email phoneNumber"
    }).select("ticketId qrCodeUrl bookedAt")
    .sort({bookedAt: 1});

    if(registeredAttendees.length === 0)
      throw new ApiError(404,"No Registered Attendees");

    return res
      .status(200)
      .json(new ApiResponse(200, registeredAttendees, "Registered attendees retrieved successfully"));  
  }
  catch(error){
    next(error);
  }
}

