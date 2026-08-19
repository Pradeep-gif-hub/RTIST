import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  id: string;
  name: string;
  designation: string;
  department: string;
  message?: string;
  photoUrl: string;
  email?: string;
}

const FacultySchema = new Schema<IFaculty>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    message: { type: String },
    photoUrl: { type: String, required: true },
    email: { type: String },
  },
  { timestamps: true }
);

export const FacultyModel = mongoose.model<IFaculty>('Faculty', FacultySchema);
