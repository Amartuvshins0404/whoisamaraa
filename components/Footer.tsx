import React from 'react';
import { portfolioData } from '../data';

export const Footer: React.FC = () => {
  const { footer } = portfolioData;

  return (
    <footer className="py-8">
      <div className="container mx-auto text-center text-zinc-500 dark:text-zinc-400 max-w-7xl">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
};