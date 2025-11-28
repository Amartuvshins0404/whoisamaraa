import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data';

declare var gsap: any;
declare var ScrollTrigger: any;

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      
      // Calculate scroll amount
      // We want to scroll until the last card is fully visible + some padding
      const totalWidth = sectionRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = totalWidth - windowWidth;

      // Background darken effect
      // OPTIMIZATION: Use document.body directly instead of string selector to avoid lookup errors
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(document.body, { backgroundColor: "#000", duration: 1 }),
        onLeave: () => gsap.to(document.body, { backgroundColor: "", clearProps: "backgroundColor", duration: 1 }),
        onEnterBack: () => gsap.to(document.body, { backgroundColor: "#000", duration: 1 }),
        onLeaveBack: () => gsap.to(document.body, { backgroundColor: "", clearProps: "backgroundColor", duration: 1 }),
      });

      // Horizontal Scroll
      const tween = gsap.to(sectionRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3500", // Longer scroll for slower feel
          pin: true,
          scrub: 0.5, // Smooth scrub
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      // 3D Card Animation
      cards.forEach((card: any, i: number) => {
        // Initial setup for 3D look
        gsap.set(card, { perspective: 1000 });
        
        // Scale and Opacity based on viewport position
        gsap.fromTo(card.querySelector('.card-inner'), 
          { 
            rotateY: 25, 
            scale: 0.9, 
            opacity: 0.5,
            z: -100
          },
          {
            rotateY: -25,
            scale: 1,
            opacity: 1,
            z: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween, // Link to horizontal scroll
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );

        // Image Parallax inside card
        const image = card.querySelector("img");
        if (image) {
          gsap.fromTo(image, 
            { scale: 1.2, xPercent: -20 },
            { 
              scale: 1.2, 
              xPercent: 20, 
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section id="projects" className="relative z-10" ref={containerRef}>
      
      {/* Mobile View */}
      <div className="lg:hidden py-24 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-zinc-800 dark:text-white">Showcase</h2>
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="glassmorphic-card rounded-3xl p-6 flex flex-col overflow-hidden">
              <div className={`aspect-video ${project.imagePlaceholderColor} rounded-2xl mb-6 relative overflow-hidden`}>
                 <img 
                    src={project.imageUrl || `https://placehold.co/800x600/png?text=${project.title.replace(/\s+/g, '+')}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                 />
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 dark:text-white">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 mt-3">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Horizontal Scroll */}
      <div className="hidden lg:block h-screen" ref={triggerRef}>
        <div className="h-full flex items-center pl-[15vw] will-change-transform" ref={sectionRef} style={{ width: 'fit-content' }}>
          
          {/* Title Section */}
          <div className="w-[30vw] shrink-0 pr-12 flex flex-col justify-center relative z-20">
            <span className="text-primary font-mono tracking-widest uppercase mb-4 text-sm">Selected Works</span>
            <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 mb-8 leading-tight">
              Showcase.
            </h2>
            <p className="text-xl text-zinc-400 max-w-sm leading-relaxed border-l-2 border-primary/50 pl-6">
              Immersive digital experiences crafted with precision.
            </p>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div key={index} className="project-card w-[50vw] shrink-0 px-8 perspective-1000">
              <div className="card-inner w-full h-[65vh] rounded-[2rem] relative overflow-hidden group shadow-2xl transition-all duration-500 border border-white/10 bg-zinc-900">
                
                {/* Image Background with Parallax */}
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src={project.imageUrl || `https://placehold.co/1200x800/png?text=${project.title.replace(/\s+/g, '+')}`}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-6">
                        <div>
                             <span className="text-primary font-mono text-sm mb-2 block">0{index + 1}</span>
                             <h3 className="text-5xl font-bold text-white mb-2">{project.title}</h3>
                        </div>
                        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group/btn">
                             <span className="material-symbols-outlined text-white text-2xl group-hover/btn:rotate-45 transition-transform duration-300">arrow_outward</span>
                        </button>
                    </div>
                    
                    <div className="flex justify-between items-start">
                        <p className="text-zinc-300 text-lg max-w-lg">{project.description}</p>
                        <div className="flex gap-2">
                             {project.tags.map(tag => (
                                 <span key={tag} className="text-xs font-bold text-zinc-400 uppercase tracking-wider border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                             ))}
                        </div>
                    </div>
                </div>

              </div>
            </div>
          ))}

          {/* Spacer to allow full scroll past last item */}
          <div className="w-[10vw] shrink-0"></div>

        </div>
      </div>
    </section>
  );
};