import React from 'react';
import { portfolioData } from '../data';

export const Header: React.FC = () => {
  const { logoText } = portfolioData.general;
  const { navigation } = portfolioData;

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4">
      <nav className="container mx-auto max-w-7xl glassmorphic-card rounded-full p-2 flex justify-between items-center">
        <a className="text-xl font-bold text-zinc-800 dark:text-white ml-4" href="#">
          {logoText}
        </a>
        <div className="hidden md:flex gap-6 text-sm font-semibold">
          {navigation.map((item) => (
            <a 
              key={item.label} 
              className="hover:text-primary transition-colors" 
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a 
          className="bg-primary text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-500/50 transition-all duration-300 mr-2" 
          href="#contact"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
};