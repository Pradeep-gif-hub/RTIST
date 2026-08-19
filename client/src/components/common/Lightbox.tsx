import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';
import { Badge } from './Badge';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-rtist-textMuted hover:text-white bg-rtist-surface/80 border border-rtist-border hover:border-rtist-accent transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-rtist-surface/80 border border-rtist-border hover:border-rtist-accent hover:bg-rtist-accent/20 transition-all hidden sm:block"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-rtist-surface/80 border border-rtist-border hover:border-rtist-accent hover:bg-rtist-accent/20 transition-all hidden sm:block"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Lightbox Content */}
      <div
        className="relative z-10 max-w-5xl w-full max-h-[90vh] bg-rtist-card border border-rtist-border flex flex-col md:flex-row overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image viewport */}
        <div className="flex-1 bg-black/60 flex items-center justify-center min-h-[300px] sm:min-h-[400px] relative">
          <img
            src={item.fullImageUrl || item.thumbnailUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain select-none"
          />
          <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-[11px] font-mono text-rtist-textMuted border border-rtist-border/50">
            FRAME // {item.id.toUpperCase()}
          </div>
        </div>

        {/* Technical Sidebar */}
        <div className="w-full md:w-80 p-5 bg-rtist-surface border-t md:border-t-0 md:border-l border-rtist-border flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="accent">{item.category}</Badge>
              <span className="text-xs font-mono text-rtist-textMuted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug font-sans">
              {item.title}
            </h3>

            <p className="text-xs text-rtist-textMuted mb-4 leading-relaxed">
              {item.caption}
            </p>

            <div className="space-y-2.5 pt-3 border-t border-rtist-border text-xs font-mono">
              <div className="flex items-center gap-2 text-rtist-textMuted">
                <MapPin className="w-3.5 h-3.5 text-rtist-accent shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>

              {item.technicalMetadata && (
                <div className="bg-rtist-card p-2.5 border border-rtist-border/60 space-y-1.5 mt-3">
                  <div className="text-[10px] text-rtist-accent flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    TECHNICAL SPECS
                  </div>
                  {item.technicalMetadata.gear && (
                    <div className="text-[11px] text-rtist-text">
                      <span className="text-rtist-textMuted">Hardware:</span> {item.technicalMetadata.gear}
                    </div>
                  )}
                  {item.technicalMetadata.shutter && (
                    <div className="text-[11px] text-rtist-text">
                      <span className="text-rtist-textMuted">Exposure:</span> {item.technicalMetadata.shutter}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 pt-3 border-t border-rtist-border">
            <div className="flex items-center gap-1 text-[10px] font-mono text-rtist-textMuted mb-2">
              <Tag className="w-3 h-3 text-rtist-accent" />
              TAGS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono bg-rtist-card text-rtist-textMuted px-2 py-0.5 border border-rtist-border"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
