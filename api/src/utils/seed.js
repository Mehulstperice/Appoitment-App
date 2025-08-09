import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Slot } from '../models/Slot.js';
import { generateSlotsUTC } from './slotGen.js';

export async function seedAdminAndSlots() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Missing admin envs');
  const exists = await User.findOne({ email: ADMIN_EMAIL });
  if (!exists) {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({ name: 'Admin', email: ADMIN_EMAIL, passwordHash, role: 'admin' });
    console.log('✅ Seeded admin');
  }

  const today = new Date();
  const from = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const to = new Date(from.getTime() + 6 * 24 * 60 * 60 * 1000);
  const slots = generateSlotsUTC(from.toISOString(), to.toISOString());

  for (const s of slots) {
    await Slot.updateOne({ startAt: s.startAt }, { $setOnInsert: s }, { upsert: true });
  }
  console.log(`✅ Seeded/ensured slots for ${slots.length} half-hours`);
}