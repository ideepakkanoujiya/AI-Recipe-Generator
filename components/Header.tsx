
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h1a1 1 0 011 1v3.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1a1 1 0 01-1-1V3.5zM3 11.5a1.5 1.5 0 013 0V12a1 1 0 001 1h1a1 1 0 011 1v3.5a1.5 1.5 0 01-3 0V17a1 1 0 00-1-1H4a1 1 0 01-1-1v-3.5z" />
            <path d="M17 3.5a1.5 1.5 0 00-3 0V4a1 1 0 01-1 1h-1a1 1 0 00-1 1v3.5a1.5 1.5 0 003 0V9a1 1 0 011-1h1a1 1 0 001-1V3.5z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            AI Recipe Generator
          </h1>
        </div>
      </div>
    </header>
  );
};
