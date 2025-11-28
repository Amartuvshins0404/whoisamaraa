import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data';

declare var gsap: any;

export const Contact: React.FC = () => {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! (Demo)");
  };

  useEffect(() => {
    if (!sectionRef.current || typeof gsap === 'undefined') return;
    
    const ctx = gsap.context(() => {
        gsap.from(".contact-anim", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24" id="contact" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="glassmorphic-card rounded-3xl p-8 md:p-12 text-center w-full contact-anim">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white">{contact.title}</h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
            {contact.description}
          </p>
          <form className="mt-8 text-left space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="contact-anim">
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1" htmlFor="name">
                  {contact.form.nameLabel}
                </label>
                <input 
                  className="w-full bg-white/30 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-primary focus:border-primary transition p-3 text-zinc-800 dark:text-white outline-none" 
                  id="name" 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-anim">
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1" htmlFor="email">
                  {contact.form.emailLabel}
                </label>
                <input 
                  className="w-full bg-white/30 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-primary focus:border-primary transition p-3 text-zinc-800 dark:text-white outline-none" 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="contact-anim">
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1" htmlFor="message">
                {contact.form.messageLabel}
              </label>
              <textarea 
                className="w-full bg-white/30 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-primary focus:border-primary transition p-3 text-zinc-800 dark:text-white outline-none resize-y" 
                id="message" 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="text-center contact-anim">
              <button 
                className="bg-primary text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-500/50 transition-all duration-300 w-full sm:w-auto" 
                type="submit"
              >
                {contact.form.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};