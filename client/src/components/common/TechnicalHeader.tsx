import React from 'react';
import { cn } from '../../utils/cn';

interface TechnicalHeaderProps {
  label: string; // e.g. "SECTION // 01" or "BUILDS // REPOSITORY"
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badgeText?: string;
  className?: string;
}

export const TechnicalHeader: React.FC<TechnicalHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  badgeText,
  className
}) => {
  return (
    <div
      className={cn(
        'mb-8 sm:mb-12',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 mb-2.5 font-mono text-xs text-rtist-accent tracking-widest uppercase font-semibold',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        <span className="w-2 h-2 bg-rtist-accent shrink-0" />
        <span>{label}</span>
        {badgeText && (
          <span className="text-rtist-textMuted bg-rtist-surface px-1.5 py-0.5 border border-rtist-border text-[10px]">
            {badgeText}
          </span>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-rtist-textMuted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
