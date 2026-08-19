import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'cyan' | 'green' | 'amber' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
  dot = false
}) => {
  const variantStyles = {
    default: 'bg-rtist-surface text-rtist-text border-rtist-border',
    accent: 'bg-rtist-accent/10 text-rtist-accent border-rtist-accent/40',
    cyan: 'bg-rtist-cyan/10 text-rtist-cyan border-rtist-cyan/40',
    green: 'bg-rtist-green/10 text-rtist-green border-rtist-green/40',
    amber: 'bg-rtist-amber/10 text-rtist-amber border-rtist-amber/40',
    muted: 'bg-rtist-surface/50 text-rtist-textMuted border-rtist-borderMuted'
  };

  const dotColors = {
    default: 'bg-rtist-textMuted',
    accent: 'bg-rtist-accent shadow-[0_0_8px_#FF5500]',
    cyan: 'bg-rtist-cyan shadow-[0_0_8px_#00E5FF]',
    green: 'bg-rtist-green shadow-[0_0_8px_#00FF66]',
    amber: 'bg-rtist-amber shadow-[0_0_8px_#FF9900]',
    muted: 'bg-rtist-textMuted'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs tracking-wider',
    md: 'px-3 py-1 text-xs sm:text-sm tracking-wider'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono uppercase font-medium border transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
};
