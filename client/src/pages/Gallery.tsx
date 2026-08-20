import React, { useState, useEffect, useMemo } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Badge } from '../components/common/Badge';
import { Lightbox } from '../components/common/Lightbox';
import { Eye, Filter, Camera, MapPin } from 'lucide-react';
import { apiService } from '../services/api';
import { GalleryItem, GalleryCategory } from '../types';
import { galleryData } from '../data/gallery';

const CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Competitions',
  'Robots',
  'RC Cars',
  'Workshops',
  'Behind the Scenes',
  'Campus',
  'Awards'
];

export const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(galleryData);
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryCategory>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    apiService.getGallery().then((data) => {
      if (data?.length) setGallery(data);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  const currentIndex = activeItem ? filteredItems.findIndex((i) => i.id === activeItem.id) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveItem(filteredItems[0]);
    }
  };

  return (
    <PageWrapper
      title="Pit &amp; Track Gallery"
      description="Visual documentation of RTIST hardware machining, reflow soldering, track testing, and tournament podiums."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="Gallery Section R-Tist"
          title="Images that turn into memories"
          subtitle="Real photographs from the NIT Jalandhar mechanical shop, electronics benches, and national tournament race tracks."
        />

        {/* Filter Bar */}
        <div className="bg-rtist-card border border-rtist-border p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <div className="flex items-center gap-1 text-xs font-mono text-rtist-textMuted mr-2">
              <Filter className="w-3.5 h-3.5 text-rtist-accent" />
              <span>CATEGORY:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                    : 'bg-rtist-surface text-rtist-textMuted border-rtist-border hover:border-rtist-accent/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-rtist-textMuted self-end sm:self-auto">
            COUNT: <span className="text-rtist-accent font-semibold">{filteredItems.length}</span> FRAMES
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-rtist-card border border-rtist-border group overflow-hidden cursor-pointer flex flex-col justify-between tech-bracket hover:border-rtist-accent/60 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-black/60 overflow-hidden sm:h-72">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rtist-card via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <Badge variant="accent" size="sm">
                    {item.category}
                  </Badge>
                </div>

                {/* Hover Eye Icon */}
                <div className="absolute top-2.5 right-2.5 bg-rtist-surface/90 border border-rtist-border p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-rtist-cyan" />
                </div>

                {/* Hardware Ref Tag */}
                {item.technicalMetadata?.gear && (
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1 text-[10px] font-mono text-rtist-textMuted bg-black/70 px-2 py-0.5 border border-rtist-border/40 truncate">
                    <Camera className="w-3 h-3 text-rtist-accent shrink-0" />
                    <span className="truncate">{item.technicalMetadata.gear}</span>
                  </div>
                )}
              </div>

              {/* Caption Content */}
              <div className="space-y-2.5 p-5">
                <h4 className="text-base font-bold text-white font-sans line-clamp-1 group-hover:text-rtist-accent transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-rtist-textMuted line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                <div className="pt-2 border-t border-rtist-border flex items-center justify-between text-[10px] font-mono text-rtist-textMuted">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rtist-cyan" />
                    <span className="truncate max-w-[120px]">{item.location.split(',')[0]}</span>
                  </span>
                  <span className="text-rtist-accent font-semibold">VIEW FULL &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </PageWrapper>
  );
};
