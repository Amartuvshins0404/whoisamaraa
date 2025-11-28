import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-2]">
      <div 
        className="gradient-blob absolute filter blur-[80px] opacity-30 z-[-1] animate-pulse-blob w-[400px] h-[400px] -top-[10%] -left-[10%]" 
        style={{ background: 'radial-gradient(circle, #5EEAD4 0%, transparent 70%)' }}
      ></div>
      <div 
        className="gradient-blob absolute filter blur-[80px] opacity-30 z-[-1] animate-pulse-blob-alt w-[500px] h-[500px] bottom-[25%] -right-[15%]"
        style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)' }}
      ></div>
      <div 
        className="gradient-blob absolute filter blur-[80px] opacity-30 z-[-1] animate-pulse-blob-fast w-[350px] h-[350px] top-[40%] left-[10%]"
        style={{ background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)' }}
      ></div>
    </div>
  );
};