export interface Project {
  id: string;
  title: string;
  category: "Design" | "AI Projects" | "Chatbots" | "Automation" | "Development";
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // Featured AI/Design projects
  {
    id: "ai-brand-identity",
    title: "AI-Powered Brand Identity",
    category: "Design",
    description: "Complete brand identity created with AI-assisted design workflows and traditional design principles.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    tags: ["Branding", "AI Design", "Visual Identity"],
    featured: true,
  },
  {
    id: "customer-support-bot",
    title: "Intelligent Customer Support Bot",
    category: "Chatbots",
    description: "Multi-language chatbot handling 10K+ queries monthly with 95% resolution rate.",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop",
    tags: ["ChatGPT", "Python", "NLP"],
    featured: true,
  },
  {
    id: "genai-content-pipeline",
    title: "GenAI Content Pipeline",
    category: "AI Projects",
    description: "Automated content generation system producing SEO-optimized articles at scale.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["LangChain", "GPT-4", "Automation"],
    featured: true,
  },
  
  // Development projects
  {
    id: "c-memory-manager",
    title: "C-Based Memory Manager",
    category: "Development",
    description: "Custom memory allocator implementing malloc/free with memory pooling, fragmentation handling, and garbage collection strategies.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    tags: ["C", "Systems Programming", "Memory Management"],
    githubUrl: "https://github.com/yourusername/memory-manager",
    featured: true,
  },
  {
    id: "python-cybersec-scanner",
    title: "Python Cybersecurity Scanner",
    category: "Development",
    description: "Comprehensive security scanning tool for vulnerability detection, port scanning, and network analysis with detailed reporting.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    tags: ["Python", "Cybersecurity", "Networking", "Nmap"],
    githubUrl: "https://github.com/yourusername/cybersec-scanner",
    featured: true,
  },
  {
    id: "fullstack-ecommerce",
    title: "Full-Stack E-Commerce Platform",
    category: "Development",
    description: "Complete e-commerce solution with React frontend, Node.js backend, payment integration, inventory management, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
  },
  
  // Other projects
  {
    id: "ai-art-collection",
    title: "AI Art Collection",
    category: "Design",
    description: "Curated collection of AI-generated artwork for digital and print applications.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=400&fit=crop",
    tags: ["Midjourney", "DALL·E", "Art"],
  },
  {
    id: "sales-automation",
    title: "Sales Automation System",
    category: "Automation",
    description: "End-to-end sales pipeline automation with AI-driven lead scoring and outreach.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Python", "APIs", "CRM"],
  },
  {
    id: "knowledge-base-assistant",
    title: "Knowledge Base Assistant",
    category: "Chatbots",
    description: "RAG-powered assistant providing instant answers from company documentation.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    tags: ["RAG", "Embeddings", "Claude"],
  },
];

export const categories = ["All", "Design", "AI Projects", "Chatbots", "Automation", "Development"] as const;
export type Category = typeof categories[number];
