import React from 'react';
import { cn } from './Card';

export function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-pill font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-sm px-6 py-2.5';
  
  const variants = {
    primary: 'bg-gold text-base hover:bg-gold-light shadow-glow',
    secondary: 'bg-elevated text-primary border border-border hover:border-gold/50 hover:text-gold',
    ghost: 'bg-transparent text-secondary hover:text-gold hover:bg-white/5',
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
