import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  thumbnailUrl: string;
  tags: string[];
}

const NewsSchema = new Schema<INews>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    publishedAt: { type: String, required: true, index: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const NewsModel = mongoose.model<INews>('News', NewsSchema);
