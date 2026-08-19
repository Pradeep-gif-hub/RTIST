import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  cornerAccents?: boolean;
  tag?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  cornerAccents = true,
  tag,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-rtist-card border border-rtist-border relative transition-all duration-300',
        hoverEffect && 'hover:border-rtist-accent/50 hover:bg-rtist-surface group',
        cornerAccents && 'tech-bracket',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {tag && (
        <div className="absolute -top-3 right-4 bg-rtist-surface border border-rtist-border px-2 py-0.5 text-[10px] font-mono text-rtist-textMuted uppercase tracking-widest z-10 group-hover:border-rtist-accent/40 group-hover:text-rtist-accent transition-colors">
          {tag}
        </div>
      )}
      {children}
    </div>
  );
};
