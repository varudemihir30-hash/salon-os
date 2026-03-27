import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cn("bg-card rounded-card shadow-glow p-6 text-primary", className)} {...props}>
      {children}
    </div>
  );
}
