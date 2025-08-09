import { Router } from 'express';
import { z } from 'zod';
import { Slot } from '../models/Slot.js';
import { Booking } from '../models/Booking.js';
import { apiError, asyncHandler } from '../errors.js';

const router = Router();

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const qSchema = z.object({ from: z.string().regex(dateRegex).optional(), to: z.string().regex(dateRegex).optional() });

router.get('/slots', asyncHandler(async (req, res) => {
  const parse = qSchema.safeParse(req.query);
  if (!parse.success) return apiError(res, 'VALIDATION_ERROR', 'Invalid dates (use YYYY-MM-DD)', 400);
  const from = parse.data.from ? new Date(parse.data.from) : new Date();
  const to = parse.data.to ? new Date(parse.data.to) : new Date(from.getTime() + 6*24*60*60*1000);

  const slots = await Slot.find({ startAt: { $gte: from.toISOString(), $lte: to.toISOString() } }).sort({ startAt: 1 }).lean();

  const slotIds = slots.map(s => s._id);
  const booked = await Booking.find({ slotId: { $in: slotIds } }, { slotId: 1 }).lean();
  const bookedIds = new Set(booked.map(b => String(b.slotId)));

  const available = slots.filter(s => !bookedIds.has(String(s._id)));
  res.json({ available });
}));

export default router;