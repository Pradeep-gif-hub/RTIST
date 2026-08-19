import React, { useState } from 'react';
import { TechnicalHeader } from '../common/TechnicalHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Lightbox } from '../common/Lightbox';
import { ArrowRight, Eye } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryPreviewProps {
  gallery: GalleryItem[];
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ gallery }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const previewItems = gallery.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 border-b border-rtist-border relative bg-rtist-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <TechnicalHeader
            label="SECTION // 08: VISUAL LOGS"
            title="PIT &amp; WORKSHOP GALLERY"
            subtitle="Raw photographs from our CNC cells, electronics benches, and competition pit lanes."
            className="mb-0"
          />

          <Button
            to="/gallery"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            className="mt-4 md:mt-0 self-start md:self-auto shrink-0"
          >
            VIEW FULL GALLERY ({gallery.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-60 bg-black/50 border border-rtist-border overflow-hidden cursor-pointer tech-bracket"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag */}
              <div className="absolute top-2.5 left-2.5">
                <Badge variant="accent" size="sm">
                  {item.category}
                </Badge>
              </div>

              {/* Hover View Icon */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-rtist-surface/80 p-1.5 border border-rtist-border">
                <Eye className="w-4 h-4 text-white" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-3 inset-x-3 space-y-1">
                <h4 className="text-xs font-bold text-white font-sans line-clamp-1 group-hover:text-rtist-accent transition-colors">
                  {item.title}
                </h4>
                <div className="text-[10px] font-mono text-rtist-textMuted flex items-center justify-between">
                  <span>{item.date}</span>
                  <span className="text-rtist-accent">INSPECT &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
