export const site = {
  name: 'Ibrahim',
  fullName: 'Ibrahim Abdulazeez',
  role: 'Senior Software Engineer',
  tagline: '8+ Years Experience • Architecture • LLM Workflows',
  headline: 'Senior Software Engineer & AI Engineer',
  email: 'waleibrahim13@gmail.com',
  location: 'Lagos, Nigeria',
  linkedin: 'https://linkedin.com/in/ibrahim-abdulazeez',
  github: 'https://github.com/ibrahim013',
  twitter: 'https://twitter.com',
  aboutHero: 'Architecting Digital Experiences.',
  aboutIntro:
    'I build AI-driven products and scalable systems, from frontend architecture to LLM workflows and cloud infrastructure. I operate at both product and engineering level, optimizing for leverage, execution speed, and practical outcomes.',
  specialties: ['AI ENGINEERING', 'FRONTEND', 'BACKEND & CLOUD'] as const,
};

export const coreStack = [
  'React',
  'TypeScript',
  'LLM Application Dev',
  'RAG',
  'Node.js',
  'Agent Architectures',
  'AWS',
];

export const recentDeployments = [
  {
    title: 'AI Customer Support Automation',
    description: 'Meridian Electronics • Next.js, OpenAI Agents SDK, MCP',
    href: 'https://meridiane-eight.vercel.app/',
  },
  {
    title: 'LightBox Property Valuation',
    description: 'Modus Create • React, Redux, Bing Maps API',
    href: 'https://www.lightboxre.com/',
  },
];

export const experience = [
  {
    role: 'Senior Frontend Engineer',
    company: 'TalentUp Africa',
    period: '2023 – 2026',
    highlights: [
      'Led frontend delivery across multiple product streams and improved candidate-to-employer matching efficiency by 35%.',
      'Introduced AI-enabled candidate evaluation workflows and improved screening accuracy by 40%.',
      'Improved recommendation and matching performance by 30% through AI-assisted decision systems.',
      'Designed scalable frontend architecture that supported 50% growth in concurrent platform usage.',
      'Mentored junior engineers and introduced engineering standards that reduced review cycles by 20%.',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'Modus Create',
    period: '2021 – 2023',
    highlights: [
      'Built production features for large-scale property valuation and research workflows.',
      'Developed React applications integrated with mapping and valuation services.',
      'Improved property data quality by 30% and increased platform engagement by 25%.',
      'Introduced testing and deployment improvements that reduced production defects by 40%.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Andela Talent Accelerator',
    period: '2019 – 2021',
    highlights: [
      'Delivered healthcare collaboration features supporting 500+ practitioners and patients.',
      'Built 15+ production features across frontend and backend systems.',
      'Automated deployment workflows and reduced release cycles by 40%.',
    ],
  },
  {
    role: 'Lead Technical Instructor',
    company: 'Waifanet Solution',
    period: '2017 – 2019',
    highlights: [
      'Led technical training programs and mentored developers on modern web stacks.',
      'Designed curriculum covering frontend, backend, and deployment practices.',
    ],
  },
];

export const skills = {
  'AI Engineering': [
    'LLM Application Development',
    'RAG Pipelines',
    'Agent Architectures',
    'LangGraph / OpenAI Agents SDK',
    'MCP Integrations',
  ],
  Frontend: [
    'React & Next.js',
    'TypeScript',
    'Redux / State Management',
    'Design Systems',
    'Performance Optimization',
  ],
  'Backend & Cloud': [
    'Node.js / Python',
    'AWS (Lambda, S3, API Gateway, Bedrock, SageMaker)',
    'PostgreSQL / Redis',
    'CI/CD & Terraform',
    'System Architecture',
  ],
};

export const education = [
  {
    degree: 'Physics | Bachelor of Science',
    institution: 'University of Jos',
    year: '2014',
  },
];

export const certifications = [
  'AWS Cloud Practitioner',
  'Innovation for Entrepreneurs',
  'AI Engineer Core Track',
  'AI for Leaders',
  'Machine Learning',
];

export const projects = [
  {
    title: 'LightBox Property Valuation Platform',
    category: 'Development',
    description:
      'Built production features for large-scale property valuation and research workflows using React and Redux, integrated with Bing Maps API.',
    tags: ['React', 'Redux', 'Bing Maps'],
    href: 'https://www.lightboxre.com/',
  },
  {
    title: 'AI Customer Support Automation',
    category: 'Development',
    description:
      'End-to-end AI customer support system using Next.js, OpenAI Agents SDK, and MCP for Meridian Electronics.',
    tags: ['Next.js', 'OpenAI', 'MCP'],
    href: 'https://meridiane-eight.vercel.app/',
  },
  {
    title: 'TalentUp Africa Platform',
    category: 'Development',
    description:
      'Scalable talent matching platform with AI-enabled candidate evaluation and recommendation systems.',
    tags: ['React', 'TypeScript', 'AI'],
    href: 'https://talentup.africa/',
  },
  {
    title: 'Influencer Matchmaking AI Agent',
    category: 'Development',
    description:
      'Agentic workflow for matching influencers with brand campaigns using LLM-powered decision systems.',
    tags: ['LLM', 'Agents', 'Python'],
    href: 'https://github.com/ibrahim013/influencer-match-making',
  },
];

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
