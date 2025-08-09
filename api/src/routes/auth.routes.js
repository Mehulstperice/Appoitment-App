import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User.js';
import { apiError, asyncHandler } from '../errors.js';

const router = Router();

const regSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) });
const logSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

router.post('/register', asyncHandler(async (req, res) => {
  const parse = regSchema.safeParse(req.body);
  if (!parse.success) return apiError(res, 'VALIDATION_ERROR', 'Invalid input', 400, { details: parse.error.flatten() });
  const { name, email, password } = parse.data;
  const exists = await User.findOne({ email });
  if (exists) return apiError(res, 'EMAIL_TAKEN', 'Email already registered', 409);
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: 'patient' });
  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const parse = logSchema.safeParse(req.body);
  if (!parse.success) return apiError(res, 'VALIDATION_ERROR', 'Invalid input', 400, { details: parse.error.flatten() });
  const { email, password } = parse.data;
  const user = await User.findOne({ email });
  if (!user) return apiError(res, 'INVALID_CREDENTIALS', 'Invalid email or password', 401);
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return apiError(res, 'INVALID_CREDENTIALS', 'Invalid email or password', 401);
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token, role: user.role });
}));

export default router;