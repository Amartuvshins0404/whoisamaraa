import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data';

declare var gsap: any;

export const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof gsap === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate Title
      gsap.fromTo(".skills-title-anim", 
        { y: 30, autoAlpha: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Animate Cards (staggered)
      // Use fromTo to explicitly set visibility to avoid "invisible" bug
      gsap.fromTo(".skill-card-anim", 
        { y: 60, autoAlpha: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", 
          },
          y: 0,
          autoAlpha: 1, 
          duration: 0.8,
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "random"
          },
          ease: "expo.out",
          clearProps: "transform" // Clean up transform to ensure hover effects work perfectly
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 relative z-20" id="skills">
      <div className="container mx-auto px-4 max-w-6xl" ref={containerRef}>
        <div className="text-center mb-20 skills-title-anim relative z-30">
            <span className="text-primary font-mono uppercase tracking-widest text-sm mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-800 dark:text-white">
            My <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 inline-block"
              style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
            >Superpowers</span>
            </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill) => (
            <div key={skill.label} className="skill-card-anim glassmorphic-card rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                <span className="material-symbols-outlined text-4xl text-zinc-700 dark:text-zinc-200 group-hover:text-primary transition-colors group-hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]">
                  {skill.icon}
                </span>
              </div>
              <h3 className="font-bold text-lg text-zinc-800 dark:text-white tracking-wide group-hover:text-primary transition-colors">{skill.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};