import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  id: string;
  title: string;
  competition: string;
  position: string;
  year: number;
  venue: string;
  team: string[];
  prizeMoney?: string;
  description: string;
  category: string;
  imageUrl?: string;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    competition: { type: String, required: true },
    position: { type: String, required: true },
    year: { type: Number, required: true, index: true },
    venue: { type: String, required: true },
    team: [{ type: String }],
    prizeMoney: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const AchievementModel = mongoose.model<IAchievement>('Achievement', AchievementSchema);
