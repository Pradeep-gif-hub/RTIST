import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  id: string;
  name: string;
  role: string;
  domain: string;
  batch: string;
  branch: string;
  expertise: string[];
  photoUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    domain: { type: String, required: true, index: true },
    batch: { type: String, required: true },
    branch: { type: String, required: true },
    expertise: [{ type: String }],
    photoUrl: { type: String, required: true },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
  },
  { timestamps: true }
);

export const TeamMemberModel = mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
