import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      enum: ['business', 'music', 'tech', 'art', 'sports', 'education', 'health', 'custom'],
      default: 'custom',
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
