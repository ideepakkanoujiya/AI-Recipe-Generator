
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-auto py-4 border-t">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Recipe Generator. Created by Deepak.</p>
      </div>
    </footer>
  );
};
