import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { Booking } from '../models/Booking.js';
import { Slot } from '../models/Slot.js';
import { apiError, asyncHandler } from '../errors.js';

const router = Router();

router.post('/book', requireAuth, asyncHandler(async (req, res) => {
  const schema = z.object({ slotId: z.string().length(24) });
  const parse = schema.safeParse(req.body);
  if (!parse.success) return apiError(res, 'VALIDATION_ERROR', 'Invalid slotId', 400);
  const { slotId } = parse.data;

  const slot = await Slot.findById(slotId);
  if (!slot) return apiError(res, 'NOT_FOUND', 'Slot not found', 404);

  try {
    const booking = await Booking.create({ userId: req.user.id, slotId });
    return res.status(201).json({ id: booking.id, slotId, userId: req.user.id });
  } catch (err) {
    if (err?.code === 11000) {
      return apiError(res, 'SLOT_TAKEN', 'This slot is already booked', 409);
    }
    throw err;
  }
}));

router.get('/my-bookings', requireAuth, requireRole('patient'), asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('slotId').sort({ created_at: -1 }).lean();
  res.json({ bookings });
}));

router.get('/all-bookings', requireAuth, requireRole('admin'), asyncHandler(async (req, res) => {
  const bookings = await Booking.find({}).populate('slotId userId').sort({ created_at: -1 }).lean();
  res.json({ bookings });
}));

export default router;