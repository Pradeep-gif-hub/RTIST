import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  caption: string;
  tags: string[];
  technicalMetadata?: {
    shutter?: string;
    gear?: string;
    projectRef?: string;
  };
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true, index: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    fullImageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    tags: [{ type: String }],
    technicalMetadata: {
      shutter: { type: String },
      gear: { type: String },
      projectRef: { type: String },
    },
  },
  { timestamps: true }
);

export const GalleryItemModel = mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
