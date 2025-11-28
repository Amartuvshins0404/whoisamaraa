
export const portfolioData = {
  general: {
    logoText: "Amaraa.",
    avatarUrl: "https://res.cloudinary.com/dolfbqzp3/image/upload/v1764166583/image_jcxjo7.jpg",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    title: "Automate your business to make it works without you",
    subtitle: "I'm Web developer who loves technology. I provide solution for business owner that needs to be working 24/7",
    ctaPrimary: { label: "View Work", href: "#projects" },
    ctaSecondary: { label: "About Me", href: "#about" },
  },
  about: {
    title: "About Me",
    description: [
      "Hello! I'm Amaraa, a passionate tech professional with a dual focus on cybersecurity and full-stack development. My mission is to build secure, scalable, and user-centric digital solutions.",
      "With a background in ethical hacking and a love for clean code, I bridge the gap between robust security and elegant user experiences.",
      "When I'm not securing networks or developing applications, you can find me exploring the latest tech trends, contributing to open-source projects, or enjoying a good cup of coffee."
    ],
  },
  skills: [
    { icon: "security", label: "Cybersecurity" },
    { icon: "code", label: "Full-Stack Dev" },
    { icon: "cloud", label: "Cloud Infra" },
    { icon: "draw", label: "UI/UX Design" },
    { icon: "database", label: "Databases" },
    { icon: "hub", label: "Networking" },
    { icon: "terminal", label: "DevOps" },
    { icon: "psychology", label: "Leadership" },
  ],
  projects: [
    {
      title: "Pock",
      description: "A threat intelligence platform providing real-time alerts on cyber vulnerabilities. Used by over 500 security analysts globally.",
      tags: ["React", "Python", "AWS"],
      imagePlaceholderColor: "bg-emerald-800",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "CodeFlow",
      description: "A collaborative code editor with integrated project management tools. Features real-time operational transformation.",
      tags: ["Vue.js", "Node.js", "WebSockets"],
      imagePlaceholderColor: "bg-blue-800",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2531&auto=format&fit=crop"
    },
    {
      title: "Aura CRM",
      description: "A minimalist CRM dashboard designed for small businesses and freelancers. Focuses on speed and offline-first capabilities.",
      tags: ["Figma", "Svelte", "Firebase"],
      imagePlaceholderColor: "bg-purple-800",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
      title: "Neon Finance",
      description: "DeFi dashboard visualization tool for tracking crypto assets across multiple chains with privacy-first analytics.",
      tags: ["Next.js", "D3.js", "Solidity"],
      imagePlaceholderColor: "bg-rose-800",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop"
    }
  ],
  contact: {
    title: "Let's Connect",
    description: "I'm currently open to new opportunities and collaborations. Feel free to reach out!",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submitButton: "Send Message",
    }
  },
  footer: {
    copyright: "© 2024 Amaraa. All Rights Reserved.",
  }
};