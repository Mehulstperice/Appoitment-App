import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db.js';
import { seedAdminAndSlots } from './utils/seed.js';
import { apiError } from './errors.js';

import authRoutes from './routes/auth.routes.js';
import slotRoutes from './routes/slots.routes.js';
import bookingRoutes from './routes/bookings.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
// app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: false }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const authLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 100 });
app.use('/api/login', authLimiter);

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api', authRoutes);
app.use('/api', slotRoutes);
app.use('/api', bookingRoutes);

app.use((req, res) => apiError(res, 'NOT_FOUND', 'Route not found', 404));

app.use((err, req, res, next) => {
  console.error(err);
  return apiError(res, 'INTERNAL_ERROR', 'Something went wrong', 500);
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('❌ Missing MONGODB_URI in .env');
    process.exit(1);
  }
  await connectDB(process.env.MONGODB_URI);
  await seedAdminAndSlots();
  app.listen(PORT, () => console.log(`🚀 API on :${PORT}`));
};
start();