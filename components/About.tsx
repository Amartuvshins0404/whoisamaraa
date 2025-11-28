import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data';

declare var gsap: any;
declare var ScrollTrigger: any;

export const About: React.FC = () => {
  const { about, general } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageColRef.current || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate text paragraphs appearing
      gsap.from(".about-text-p", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });

       // Floating animation for image
       gsap.to(".about-img-container", {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
       });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 min-h-screen flex items-center relative z-10" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 flex justify-center" ref={imageColRef}>
             <div className="relative group perspective-1000 about-img-container">
               <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 blur-[60px] opacity-40 rounded-full z-0 group-hover:opacity-60 transition-opacity duration-700"></div>
               <img 
                alt="Profile avatar smiling" 
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover shadow-2xl border border-white/10 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                src={general.avatarUrl} 
              />
             </div>
          </div>

          <div className="md:col-span-7 about-content pl-0 md:pl-12">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Introduction</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-zinc-800 dark:text-white">
              {about.title}
            </h2>
            <div className="space-y-8">
              {about.description.map((paragraph, index) => (
                <div key={index} className="about-text-p">
                  <p className="text-zinc-600 dark:text-zinc-300 text-xl leading-relaxed font-light border-l-2 border-primary/30 pl-6">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};