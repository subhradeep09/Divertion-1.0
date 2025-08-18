import Event from "../../models/event.models.js";
import Booking from "../../models/booking.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import QRCode from "qrcode";
import { sendEmail } from "../../utils/sendEmail.js";

export const viewEvents = async (req, res, next) => {
  try {
    console.log(req.user);
    const events = await Event.find({
      isPublished: true,
      status: "APPROVED",
      date: { $gte: new Date() },
    }).sort({ date: 1 });
    return res
      .status(200)
      .json(new ApiResponse(200, events, "Events retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const bookEvents = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(404, "Unauthorized Request");
    }

    const bookedEvent = await Booking.findOne({ event: eventId, user: userId });
    if (bookedEvent) {
      throw new ApiError(400, "You have already booked this event");
    }

    const event = await Event.findOne({
      _id: eventId,
      isPublished: true,
      status: "APPROVED",
      date: { $gte: new Date() },
    });

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    const confirmedBookings = await Booking.countDocuments({
      event: eventId,
      paymentStatus: { $in: ["SUCCESS", "FREE"] },
    });

    if (confirmedBookings >= event.capacity) {
      throw new ApiError(400, "Event is fully booked");
    }
    const ticketId = `${event._id}-${userId}-${Date.now()}`;
    const paymentStatus = event.isPaid ? "SUCCESS" : "FREE";
    const qrCodeUrl = await QRCode.toDataURL(ticketId);
    const qrBuffer = await QRCode.toBuffer(ticketId);

    const booking = await Booking.create({
      event: event._id,
      user: userId,
      ticketId,
      paymentStatus,
      qrCodeUrl,
    });

    const user = req.user;
    const subject = `🎟️ Booking Confirmation for ${event.title}`;
    const html = `
      <h2>Hi ${user.fullname},</h2>
      <p>Thank you for booking <b>${event.title}</b>!</p>
      <p><b>Date:</b> ${new Date(event.date).toLocaleString()}</p>
      <p><b>Location:</b> ${event.location || "TBA"}</p>
      <p>Your Ticket ID: <b>${ticketId}</b></p>
      <p>Please present this QR code at the event entrance:</p>
      <img src="cid:qrcode" alt="QR Code Ticket"/>
      <br/>
      <p>We look forward to seeing you 🎉</p>
      <p>— Team Divertion</p>
    `;

    await sendEmail(user.email, subject, html, [
      {
        filename: "ticket.png",
        content: qrBuffer,
        cid: "qrcode", 
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, booking, "Event booked and booking confirmation sent successfully"));
  } catch (error) {
    next(error);
  }
};

export const upcomingBookedEvents = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if(!userId) {
      throw new ApiError(404, "Unauthorized Request");
    }
    const upcomingBookedEvents = await Booking.find({ user: userId })
      .populate({
        path: "event",
        match: { date: { $gte: new Date() }, isPublished: true, status: "APPROVED" },
        select: "title date location",
      })
      .sort({ "event.date": 1 });
      const filteredEvents = upcomingBookedEvents.filter(b => b.event !== null);
    return res
      .status(200)
      .json(new ApiResponse(200, filteredEvents, "Upcoming booked events retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const bookingHistory = async(req, res, next) => {
  try {
    const userId = req.user._id;
    if(!userId) {
      throw new ApiError(404, "Unauthorized Request");
    }
    const bookingHistory = await Booking.find({ user: userId })
    .populate({
      path: "event",
      select: "title date location bannerImage",
    }).select("bookedAt")
    .sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, bookingHistory, "Booking history retrieved successfully"));
  } catch (error) {
    next(error);
  }
}

export const cancelBooking = async(req, res, next) => {
  try {
    const { bookingId } = req.params;
    if(!bookingId) {
      throw new ApiError(404, "Booking not found");
    }
    const userId = req.user._id;
    if(!userId) {
      throw new ApiError(404, "Unauthorized Request");
    }
    const booking = await Booking.findOneAndDelete({ _id: bookingId, user: userId }).populate({
      path: "event",
      match: { date: { $gte: new Date() }, isPublished: true, status: "APPROVED" },
    });

    if(!booking || !booking.event) {
      throw new ApiError(404, "Booking not found or unauthorized");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Booking cancelled successfully"));
  } catch (error) {
    next(error);
  }
}