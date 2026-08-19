import mongoose from 'mongoose';
import { seedInitialData } from '../services/seedService.js';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rtist_db';

  try {
    console.log(`[RTIST DB] Attempting connection to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('[RTIST DB] MongoDB connected successfully.');
    await seedInitialData();
  } catch (err: any) {
    console.warn('[RTIST DB Warning] Could not connect to local MongoDB server:', err.message);
    console.warn('[RTIST DB] Running in hybrid resilient mode. Frontend client has built-in embedded data layer.');
  }
}
