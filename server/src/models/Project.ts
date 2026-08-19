import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: number;
  featured?: boolean;
  status: string;
  thumbnailUrl: string;
  overview: string;
  problemStatement: string;
  mechanicalDesign: {
    chassisType: string;
    weight: string;
    dimensions: string;
    materials: string[];
    cadNotes: string;
  };
  hardware: {
    name: string;
    spec: string;
    qty?: number;
    purpose?: string;
  }[];
  software: {
    layer: string;
    tech: string;
    details: string;
  }[];
  circuitDiagramUrl?: string;
  cadModelUrl?: string;
  buildProcess: string[];
  testingNotes: string;
  challengesEncountered: string[];
  competitionResults: string;
  galleryImages: string[];
  teamMembers: {
    name: string;
    role: string;
  }[];
  specsSummary: {
    topSpeed?: string;
    maxThrust?: string;
    batteryLife?: string;
    microcontroller?: string;
    weight?: string;
  };
  githubRepo?: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true, index: true },
    year: { type: Number, required: true, index: true },
    featured: { type: Boolean, default: false },
    status: { type: String, default: 'Operational' },
    thumbnailUrl: { type: String, required: true },
    overview: { type: String, required: true },
    problemStatement: { type: String, required: true },
    mechanicalDesign: {
      chassisType: { type: String, default: '' },
      weight: { type: String, default: '' },
      dimensions: { type: String, default: '' },
      materials: [{ type: String }],
      cadNotes: { type: String, default: '' },
    },
    hardware: [
      {
        name: { type: String, required: true },
        spec: { type: String, required: true },
        qty: { type: Number, default: 1 },
        purpose: { type: String, default: '' },
      },
    ],
    software: [
      {
        layer: { type: String, required: true },
        tech: { type: String, required: true },
        details: { type: String, default: '' },
      },
    ],
    circuitDiagramUrl: { type: String },
    cadModelUrl: { type: String },
    buildProcess: [{ type: String }],
    testingNotes: { type: String, default: '' },
    challengesEncountered: [{ type: String }],
    competitionResults: { type: String, default: '' },
    galleryImages: [{ type: String }],
    teamMembers: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    specsSummary: {
      topSpeed: { type: String },
      maxThrust: { type: String },
      batteryLife: { type: String },
      microcontroller: { type: String },
      weight: { type: String },
    },
    githubRepo: { type: String },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
