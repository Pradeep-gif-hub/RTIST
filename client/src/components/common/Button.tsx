import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'right',
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rtist-accent/50 disabled:opacity-50 disabled:cursor-not-allowed select-none group relative';

  const variantStyles = {
    primary: 'bg-rtist-accent hover:bg-rtist-accentHover text-white shadow-accent-glow hover:shadow-[0_0_30px_rgba(255,85,0,0.5)] border border-rtist-accent',
    secondary: 'bg-rtist-surface hover:bg-rtist-elevated text-rtist-text border border-rtist-border hover:border-rtist-accent/60',
    outline: 'bg-transparent hover:bg-rtist-accent/10 text-rtist-accent border border-rtist-accent hover:border-rtist-accentHover',
    ghost: 'bg-transparent hover:bg-rtist-surface text-rtist-text hover:text-white border border-transparent',
    danger: 'bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base'
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
