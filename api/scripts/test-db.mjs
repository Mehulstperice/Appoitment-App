import mongoose from 'mongoose';
import 'dotenv/config';

if (!process.env.MONGODB_URI) {
  console.error('Missing MONGODB_URI'); process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI, { autoIndex: true });
  console.log('Connected OK to Atlas');
  await mongoose.disconnect();
  process.exit(0);
} catch (e) {
  console.error('Connection failed:', e.message);
  process.exit(1);
}