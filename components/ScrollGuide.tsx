import React, { useEffect, useRef, useState } from 'react';

declare var gsap: any;
declare var ScrollTrigger: any;

const PARTICLE_COUNT = 1; // Optimized to 1 for maximum performance (no lag)

export const ScrollGuide: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const calculatePath = () => {
      const hero = document.getElementById('hero');
      const about = document.getElementById('about');
      const skills = document.getElementById('skills');
      const projects = document.getElementById('projects');
      const contact = document.getElementById('contact');

      if (!hero || !about || !skills || !projects || !contact) return;

      // Recalculate dimensions based on full document height (including pins)
      const width = window.innerWidth;
      const height = document.body.scrollHeight;

      setSvgDimensions({ width, height });

      // Helper to get center coordinates relative to document
      const getPoint = (element: HTMLElement, xOffsetPercent: number = 0.5, yOffset: number = 0) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        let x = width * xOffsetPercent;
        const padding = 50;
        x = Math.max(padding, Math.min(width - padding, x));

        // Use absolute Y coordinate
        const y = rect.top + scrollTop + (rect.height / 2) + yOffset;
        return { x, y };
      };

      // Define anchor points
      const pStart = { x: width * 0.5, y: 0 };
      const pHero = getPoint(hero, 0.5);
      
      // About
      const pAbout = getPoint(about, 0.75); 
      
      // Skills
      const skillsTitle = document.querySelector('.skills-title-anim');
      let pSkillsCenter = getPoint(skills, 0.5, -150);
      
      if (skillsTitle) {
          const rect = skillsTitle.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          pSkillsCenter = {
              x: rect.left + rect.width / 2,
              y: rect.top + scrollTop + rect.height / 2
          };
      }

      // Projects
      const pProjectsStart = { 
        x: Math.max(80, width * 0.15), 
        y: getPoint(projects).y - 200 
      }; 
      const pProjectsEnd = { 
        x: Math.max(80, width * 0.15), 
        y: getPoint(projects).y + 200 
      };
      
      // Contact
      const pContact = getPoint(contact, 0.5);
      
      // Path Segments
      let d = `M ${pStart.x} ${pStart.y} L ${pHero.x} ${pHero.y}`;
      d += ` C ${pHero.x} ${pHero.y + 300}, ${pAbout.x} ${pAbout.y - 300}, ${pAbout.x} ${pAbout.y}`;
      d += ` C ${pAbout.x} ${pAbout.y + 300}, ${pSkillsCenter.x} ${pSkillsCenter.y - 300}, ${pSkillsCenter.x} ${pSkillsCenter.y}`;
      d += ` C ${pSkillsCenter.x} ${pSkillsCenter.y + 300}, ${pProjectsStart.x + 100} ${pProjectsStart.y - 200}, ${pProjectsStart.x} ${pProjectsStart.y}`;

      const zigCount = 3;
      const zigHeight = (pProjectsEnd.y - pProjectsStart.y) / zigCount;
      const zigWidth = 40; 
      
      for (let i = 0; i < zigCount; i++) {
         const y1 = pProjectsStart.y + (i * zigHeight);
         const y2 = y1 + (zigHeight / 2);
         const y3 = y1 + zigHeight;
         d += ` Q ${pProjectsStart.x + zigWidth} ${y1 + (zigHeight * 0.25)}, ${pProjectsStart.x + zigWidth} ${y2}`;
         d += ` Q ${pProjectsStart.x - zigWidth} ${y2 + (zigHeight * 0.25)}, ${pProjectsStart.x} ${y3}`;
      }

      d += ` C ${pProjectsEnd.x} ${pProjectsEnd.y + 300}, ${pContact.x} ${pContact.y - 400}, ${pContact.x} ${pContact.y - 100}`;

      const cx = pContact.x;
      const cy = pContact.y + 50;
      let radius = 100;
      let angle = -Math.PI / 2;
      
      for (let i = 0; i < 9; i++) {
         const newRadius = radius - 10;
         const newAngle = angle + (Math.PI / 4);
         const tx = cx + Math.cos(newAngle) * newRadius;
         const ty = cy + Math.sin(newAngle) * newRadius;
         const cpAngle = angle + (Math.PI / 8);
         const cpx = cx + Math.cos(cpAngle) * radius;
         const cpy = cy + Math.sin(cpAngle) * radius;
         d += ` Q ${cpx} ${cpy}, ${tx} ${ty}`;
         radius = newRadius;
         angle = newAngle;
      }

      setPathD(d);
    };

    // Recalculate on ScrollTrigger refresh (handles pins/resize)
    ScrollTrigger.addEventListener("refresh", calculatePath);
    calculatePath();

    const handleResize = () => {
        calculatePath();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener("refresh", calculatePath);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden" style={{ height: svgDimensions.height }}>
      <svg 
        width={svgDimensions.width} 
        height={svgDimensions.height} 
        className="overflow-visible"
        shapeRendering="geometricPrecision"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
            <stop offset="20%" stopColor="#0EA5E9" stopOpacity="1" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="1" />
            <stop offset="80%" stopColor="#EC4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </linearGradient>
          {/* REMOVED FILTER FOR PERFORMANCE - USING VECTOR LAYERING INSTEAD */}
        </defs>

        {/* 1. Track (Background) */}
        <path 
          d={pathD} 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="10" 
          fill="none" 
        />
        
        {/* 2. Invisible Guide Path for MotionPathPlugin */}
        <path
          ref={pathRef}
          id="guidePath"
          d={pathD}
          stroke="none"
          fill="none"
        />

        {/* 3. FAKE GLOW - Outer Layer (High Blur Simulation) */}
        <path 
          d={pathD} 
          stroke="url(#neonGradient)" 
          strokeWidth="20" 
          strokeOpacity="0.2"
          fill="none"
          strokeLinecap="round"
          className="will-change-transform"
          ref={glowPathRef} // We animate this one
        />

        {/* 4. FAKE GLOW - Inner Layer (Medium Blur Simulation) */}
        <path 
          d={pathD} 
          stroke="url(#neonGradient)" 
          strokeWidth="8" 
          strokeOpacity="0.5"
          fill="none"
          strokeLinecap="round"
          className="will-change-transform"
        />

        {/* 5. Core (Bright White/Color) */}
        <path 
          d={pathD} 
          stroke="url(#neonGradient)" 
          strokeWidth="3" 
          strokeOpacity="1"
          fill="none"
          strokeLinecap="round"
          className="will-change-transform"
        />

        {/* Use pathD as key to force re-mount and sync when path updates */}
        {pathD && <ScrollTriggerLogic pathRef={glowPathRef} key={pathD} />}

        {pathD && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
             <Particle key={`p-${i}-${pathD}`} index={i} pathId="#guidePath" total={PARTICLE_COUNT} />
        ))}
        
      </svg>
    </div>
  );
};

const ScrollTriggerLogic = ({ pathRef }: { pathRef: React.RefObject<SVGPathElement> }) => {
    useEffect(() => {
        if(!pathRef.current) return;
        
        const ctx = gsap.context(() => {
            const length = pathRef.current!.getTotalLength();
            // Animate all paths that share this d attribute if possible, but for now we just drive the main ref
            // Note: In this vector implementation, we are drawing the line via strokeDashoffset.
            // To animate ALL layers (outer, inner, core), we should select them all.
            const allPaths = pathRef.current!.parentElement?.querySelectorAll('path[stroke*="url(#neonGradient)"]');
            
            if (allPaths) {
                gsap.set(allPaths, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(allPaths, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body, // OPTIMIZED: Use document.body
                        start: "top top",
                        end: "bottom bottom", 
                        scrub: 0, 
                        invalidateOnRefresh: true
                    }
                });
            }
        });
        return () => ctx.revert();
    }, [pathRef]);
    return null;
}

const Particle = ({ index, pathId, total }: { index: number, pathId: string, total: number }) => {
    const groupRef = useRef<SVGGElement>(null);
    
    useEffect(() => {
        if (!groupRef.current) return;

        const ctx = gsap.context(() => {
            // No lag for the head particle to ensure it sticks to the line tip
            const lag = 0; 
            
            gsap.to(groupRef.current, {
                motionPath: {
                    path: pathId,
                    align: pathId,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                },
                ease: "none",
                scrollTrigger: {
                    trigger: document.body, // OPTIMIZED: Use document.body
                    start: "top top",
                    end: "bottom bottom", 
                    scrub: lag, 
                }
            });
        });
        return () => ctx.revert();

    }, [pathId, index]);

    return (
        <g ref={groupRef}>
            {/* Fake Glow Halo for Particle */}
            <circle r="12" fill="#0EA5E9" opacity="0.4" />
            <circle r="20" fill="#A855F7" opacity="0.2" />
            {/* Core */}
            <circle r="6" fill="#fff" />
        </g>
    );
}