import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// prevent double booking
bookingSchema.index({ slotId: 1 }, { unique: true });

export const Booking = mongoose.model('Booking', bookingSchema);