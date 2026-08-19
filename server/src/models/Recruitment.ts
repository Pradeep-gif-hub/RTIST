import mongoose, { Schema, Document } from 'mongoose';

export interface IRecruitment extends Document {
  name: string;
  email: string;
  rollNumber: string;
  branch: string;
  year: string;
  areasOfInterest: string[];
  technicalSkills: string;
  priorExperience?: string;
  whyJoin: string;
  githubOrPortfolio?: string;
  status: string;
  createdAt: Date;
}

const RecruitmentSchema = new Schema<IRecruitment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    rollNumber: { type: String, required: true, index: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    areasOfInterest: [{ type: String }],
    technicalSkills: { type: String, required: true },
    priorExperience: { type: String },
    whyJoin: { type: String, required: true },
    githubOrPortfolio: { type: String },
    status: { type: String, default: 'Pending', index: true },
  },
  { timestamps: true }
);

export const RecruitmentModel = mongoose.model<IRecruitment>('Recruitment', RecruitmentSchema);
