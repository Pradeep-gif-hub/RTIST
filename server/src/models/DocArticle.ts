import mongoose, { Schema, Document } from 'mongoose';

export interface IDocArticle extends Document {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  summary: string;
  difficulty: string;
  readTime: string;
  lastUpdated: string;
  author: string;
  tags: string[];
  introduction: string;
  howItWorks: string;
  specifications: { label: string; value: string }[];
  pinout?: {
    pin: string;
    name: string;
    type: string;
    description: string;
  }[];
  wiringNotes: string;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  applications: string[];
  troubleshooting: { issue: string; solution: string }[];
}

const DocArticleSchema = new Schema<IDocArticle>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    difficulty: { type: String, required: true },
    readTime: { type: String, required: true },
    lastUpdated: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    introduction: { type: String, required: true },
    howItWorks: { type: String, required: true },
    specifications: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    pinout: [
      {
        pin: { type: String },
        name: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],
    wiringNotes: { type: String, default: '' },
    codeSnippet: {
      language: { type: String },
      code: { type: String },
      description: { type: String },
    },
    applications: [{ type: String }],
    troubleshooting: [
      {
        issue: { type: String },
        solution: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const DocArticleModel = mongoose.model<IDocArticle>('DocArticle', DocArticleSchema);
