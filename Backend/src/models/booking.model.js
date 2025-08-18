import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS','FAILED','FREE'],
      required: true,
    },
    qrCodeUrl: {
      type: String,
    },
    ticketId: {
      type: String,
    unique: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
