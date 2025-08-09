import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  startAt: { type: String, required: true }, // ISO UTC
  endAt:   { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// one slot per startAt
slotSchema.index({ startAt: 1 }, { unique: true });

export const Slot = mongoose.model('Slot', slotSchema);