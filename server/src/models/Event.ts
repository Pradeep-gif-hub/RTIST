import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  isPast: boolean;
  registrationOpen: boolean;
  registrationDeadline?: string;
  fee?: string;
  prizePool?: string;
  thumbnailUrl: string;
  bannerUrl: string;
  description: string;
  rules: string[];
  eligibility: string[];
  schedule: {
    time: string;
    title: string;
    description: string;
  }[];
  coordinators: {
    name: string;
    role: string;
    contact?: string;
  }[];
  registeredTeamsCount?: number;
  winners?: {
    position: string;
    teamName: string;
    college: string;
  }[];
  photos?: string[];
  videoUrl?: string;
}

const EventSchema = new Schema<IEvent>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    isPast: { type: Boolean, default: false, index: true },
    registrationOpen: { type: Boolean, default: true },
    registrationDeadline: { type: String },
    fee: { type: String },
    prizePool: { type: String },
    thumbnailUrl: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    description: { type: String, required: true },
    rules: [{ type: String }],
    eligibility: [{ type: String }],
    schedule: [
      {
        time: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
      },
    ],
    coordinators: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        contact: { type: String },
      },
    ],
    registeredTeamsCount: { type: Number, default: 0 },
    winners: [
      {
        position: { type: String, required: true },
        teamName: { type: String, required: true },
        college: { type: String, required: true },
      },
    ],
    photos: [{ type: String }],
    videoUrl: { type: String },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);
