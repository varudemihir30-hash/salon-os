import React from 'react';
import { cn } from './Card';

export function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-elevated border-border text-primary',
    gold: 'bg-gold/10 border-gold/30 text-gold',
    success: 'bg-accent-mint/10 border-accent-mint/30 text-accent-mint',
    danger: 'bg-accent-rose/10 border-accent-rose/30 text-accent-rose',
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
