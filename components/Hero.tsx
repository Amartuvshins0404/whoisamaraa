import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data';

declare var gsap: any;

export const Hero: React.FC = () => {
  const { hero, general } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to split text into words for animation
  const renderSplitText = (text: string, className: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
        <span className={`${className} inline-block transform translate-y-full`}>
          {word}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    if (!containerRef.current || typeof gsap === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Image Scale & Fade
      tl.from(".hero-img-container", {
        scale: 0.5,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out"
      })
      // Title Word Reveal
      .to(".hero-title-word", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=1.2")
      // Subtitle Reveal
      .to(".hero-subtitle-word", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
      }, "-=1")
      // Buttons Fade Up
      .from(".hero-btn", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      }, "-=0.8");

      // 3D Tilt Effect on Mouse Move
      const heroContent = containerRef.current!.querySelector('.hero-content') as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroContent) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20; // -10 to 10deg
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(heroContent, {
          rotateY: xPos,
          rotateX: -yPos,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => { // Cleanup inside context
         window.removeEventListener('mousemove', handleMouseMove);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 relative z-10 perspective-1000" id="hero" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="hero-content glassmorphic-card rounded-[3rem] w-full max-w-6xl mx-auto p-8 md:p-20 text-center border-t border-white/20 backdrop-blur-3xl shadow-2xl relative overflow-hidden transform-style-3d">
            
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

          <div className="flex flex-col items-center relative z-10 transform-style-3d translate-z-10">
            
            <div className="relative mb-12 hero-img-container">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-[80px] opacity-50 animate-pulse-blob"></div>
              <div className="relative p-1 bg-gradient-to-br from-white/50 to-transparent rounded-full">
                <img 
                    alt={`Profile picture of ${general.logoText}`} 
                    className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl" 
                    src={general.avatarUrl} 
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-white dark:bg-zinc-900 p-3 rounded-full shadow-lg flex items-center justify-center z-10 animate-bounce">
                <span className="material-symbols-outlined text-primary text-2xl">arrow_downward</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white leading-[1] max-w-5xl mx-auto tracking-tighter mb-8">
              {renderSplitText(hero.title, "hero-title-word opacity-0")}
            </h1>
            
            <div className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
               <p>{renderSplitText(hero.subtitle, "hero-subtitle-word opacity-0")}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <a 
                className="hero-btn group bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold py-5 px-10 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 text-lg" 
                href={hero.ctaPrimary.href}
              >
                {hero.ctaPrimary.label}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a 
                className="hero-btn bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-white font-semibold py-5 px-10 rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-lg" 
                href={hero.ctaSecondary.href}
              >
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};