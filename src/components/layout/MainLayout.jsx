import React from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({ children, activePath, onNavigate }) {
  return (
    <div className="min-h-screen flex bg-base text-primary font-ui selection:bg-gold/30 selection:text-white">
      <Sidebar activePath={activePath} onNavigate={onNavigate} />
      <main className="flex-1 ml-60 min-h-screen relative p-8">
        <div className="max-w-[1400px] mx-auto h-full space-y-8 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
