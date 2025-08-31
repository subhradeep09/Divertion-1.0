import mongoose from "mongoose";

const cancelledBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", 
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    refundStatus: {
      type: String,
      enum: ["INITIATED", "COMPLETED", "FAILED", "NOT_APPLICABLE"],
      default: "NOT_APPLICABLE",
    },
    cancelledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserCancelledBooking = mongoose.model(
  "UserCancelledBooking",
  cancelledBookingSchema
);
export default UserCancelledBooking;