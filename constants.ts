

import { Job, Passion, BlogPost, LifestyleItem, PodcastEpisode } from './types';

export const RESUME_CONTEXT = `
You are an AI assistant representing Apoorva Gururaja on her portfolio website. Answer questions as if you are her digital twin, based on the following resume data:

Name: Apoorva Gururaja
Location: Mountain View, CA
Contact: gururaja.apoorva@gmail.com
Phone: +1 (408) 745-9836
Links: https://www.linkedin.com/in/apoorvagururaja/

Summary:
Technical Program Manager & AI Product Manager who loves turning complex ideas into reality. Over 8 years of experience leading programs/products at Google, Amazon, LinkedIn, Cisco, and AI startups.
Currently seeking the next opportunity to drive impact in Program Management.
Work lies at the intersection of people, process, and technology. Focused on building scalable systems, automation, and AI.
Energized by ambiguity, collaborative leadership, and creating products that simplify life.
`;

export const JOBS: Job[] = [
  {
    id: 'next-play',
    role: 'Brewing Next Adventure',
    company: 'Open to Opportunities',
    location: 'Bay Area, CA',
    period: 'Present',
    description: [
      'Currently exploring the next big challenge in Technical Program Management.',
      'Ready to build scalable systems, drive AI innovation, and lead cross-functional teams.',
      'Refining skills in AI strategy and preparing for the next chapter.'
    ],
    technologies: ['AI Strategy', 'Program Management', 'Leadership', 'Innovation']
  },
  {
    id: 'inhabitr',
    role: 'AI Product Manager',
    company: 'Inhabitr',
    location: 'Milpitas, CA',
    period: 'Apr 2025 – Oct 2025',
    description: [
      'Own and scale a $20M+ AI-driven product portfolio across hospitality, student housing, and e-commerce platforms (Integer, Inplace, Inspire, and PDM 2).',
      'Partner directly with the CEO and CTO to translate high-level business objectives into actionable product roadmaps, detailed PRDs, Figma designs and prioritized sprint deliverables.',
      'Launched Inspire, an AI-powered design tool that enables interior designers to auto-generate furniture layouts, FF&E boards, and procurement workflows, cutting design cycle time by 40% and improving client satisfaction through real-time layout iteration.',
      'Delivered major feature upgrades to Integer, Inplace, and PDM 2, fixing data sync issues and redesigning UI workflows that increased operational throughput by ~25% across departments.',
      'Implemented automated E2E/API tests (Cypress) and load testing (JMeter), reducing QA cycle time by 35% and cutting production incidents per release by 20%.'
    ],
    technologies: ['AI/ML', 'Figma', 'Cypress', 'JMeter', 'Product Roadmap', 'PRDs', 'Hospitality Tech']
  },
  {
    id: 'amazon',
    role: 'Technical Program Manager',
    company: 'Amazon',
    location: 'New York, NY',
    period: 'May 2024 – Nov 2024',
    description: [
      'Drove cross-functional initiatives across 3 engineering teams to simplify Prime Badge business logic and unify customer experience across multiple Amazon e-commerce consumer-facing services.',
      'Consolidated fragmented Prime Badge codebases from 5+ systems into a single centralized service, reducing maintenance overhead by 30% and accelerating rollout of new business logic.',
      'Designed Prime Upsell flows for Non-Prime customers, contributing to 2.2M+ new Prime conversions (+15% conversion lift) through data-driven eligibility detection and behavioral targeting. Led quality testing for Mobile (Android, iPhone) and Web devices.',
      'Created a cross-tenant dependency tracker in Google Workspace for PM and TPM stakeholders, increasing visibility into launch readiness by 30% and improving OP1/OP2 planning efficiency.'
    ],
    technologies: ['E-commerce', 'Mobile (iOS/Android)', 'A/B Testing', 'System Migration', 'Google Workspace']
  },
  {
    id: 'google-ny',
    role: 'Technical Program Manager',
    company: 'Google',
    location: 'New York, NY',
    period: 'Jun 2023 – Dec 2023',
    description: [
      'Scoped and launched AI-powered support and engagement programs serving 45K+ Firebase developers, including planning a Paid Support Model, AI Support Chat Agent, and CSAT dashboard automation.',
      'Collaborated with Firebase and Salesforce engineering to implement bi-directional integration pipelines, ensuring accurate CSAT data flow, improved case visibility, and consistent reporting.',
      'Revamped Firebase Office Hours and partnership engagement flow, enabling real-time tracking of developer interactions, raising partner satisfaction scores by 20%.',
      'Conducted a competitive analysis of AI-enabled CRM solutions, piloted Gemini integration in Firebase’s support workflows, and accelerated internal AI adoption by 25%.',
      'Delivered detailed performance and engagement reports to senior leadership, directly influencing 2024 roadmap priorities for support automation and AI augmentation.'
    ],
    technologies: ['AI Agents', 'Firebase', 'Salesforce', 'Gemini', 'CRM', 'Support Automation']
  },
  {
    id: 'linkedin',
    role: 'Technical Program Manager',
    company: 'LinkedIn',
    location: 'Remote',
    period: 'Sep 2021 – Apr 2023',
    description: [
      'Led modernization of the LinkedIn Admin Center used by global enterprise customers to manage billing, data, and permissions, improving system reliability and user accuracy by 25%.',
      'Led 2 horizontal initiatives, UMP Migration to Azure and Big Data Table Migration.',
      'Managed the Customer Data Management System (CDMS) engineering team to unify fragmented data workflows, streamline customer sync processes, and improve billing reconciliation by 30%.',
      'Established cross-org OKR alignment and planning cadence, increasing program predictability and ensuring 90% of initiatives tied directly to business goals.',
      'Collaborated with Security, Marketing, Design, and Product teams to deploy scalable testing and validation protocols for customer data integrity.'
    ],
    technologies: ['Azure', 'Big Data', 'System Modernization', 'CDMS', 'OKR Planning']
  },
  {
    id: 'google-sv',
    role: 'Technical Program Manager',
    company: 'Google',
    location: 'Sunnyvale, CA',
    period: 'Apr 2020 – Sep 2021',
    description: [
      'Oversaw remediation of 5,000+ GCP policy violations, securing infrastructure supporting $19.2B in annual revenue.',
      'Built automated enforcement workflows and dashboards to track compliance, reducing manual remediation time by 40%.',
      'Founded the Cloud Security Remediation Champions Program, training engineers across orgs to proactively identify and mitigate security risks, cutting repeat violations by 25%.',
      'Created post-mortem frameworks to analyze root causes, standardize resolutions, and prevent recurrence of systemic issues.'
    ],
    technologies: ['GCP', 'Cloud Security', 'Compliance', 'Dashboarding', 'Incident Management']
  },
  {
    id: 'cisco',
    role: 'Project / Product Manager',
    company: 'Cisco Systems, Inc.',
    location: 'San Jose, CA',
    period: 'Mar 2018 – Apr 2020',
    description: [
      'Managed cross-functional initiatives across Cisco’s $4B Data Center Networking ecosystem, driving operational efficiency and strategic alignment.',
      'Built Python-based automation scripts and Tableau dashboards for The Catalyst Project, giving leadership visibility into ecosystem performance and partner ROI.',
      'Partnered with Marketing, Product, and Engineering to deliver 10+ customer case studies and live demos at Cisco Live, strengthening brand credibility and product adoption.'
    ],
    technologies: ['Python', 'Tableau', 'Data Center Networking', 'Automation', 'Strategic Alignment']
  }
];

export const PASSIONS: Passion[] = [
  {
    title: 'AI & Automation',
    description: 'I love automating the mundane. From Python scripts at Cisco to Gemini integration at Google, I thrive on using AI to make life simpler and work more efficient.',
    icon: 'Bot'
  },
  {
    title: 'Product Strategy',
    description: 'Translating high-level business objectives into actionable roadmaps. I enjoy the puzzle of fitting user needs, technical constraints, and business goals together.',
    icon: 'Map'
  },
  {
    title: 'Collaborative Leadership',
    description: 'Moving teams from "we could" to "we did". I believe in empowering engineering teams and fostering cross-functional alignment.',
    icon: 'Users'
  },
  {
    title: 'Mentorship',
    description: 'Founded programs like the Cloud Security Remediation Champions to help others grow. Sharing knowledge is a core value of mine.',
    icon: 'Heart'
  }
];

// Gallery Images with Captions
export const GALLERY_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764392904/IMG_7131_y1tjvt.jpg',
    caption: 'My boy, Simba, 5 year old Aussiedoodle'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764392906/IMG_0491_zj3equ.jpg',
    caption: 'My parents'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764392906/IMG_6451_nyqfkb.jpg',
    caption: 'With my husband in Eze, French Riviera, South of France'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764392904/IMG_5877_sehg5t.jpg',
    caption: 'In Amsterdam'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764392905/FullSizeRender_unalo5.jpg',
    caption: 'My sister'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764395977/IMG_5191_ninr4y.jpg',
    caption: 'Breakfast in Brix, Napa Valley'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764395980/IMG_5836_s5rnla.jpg',
    caption: 'Sunflowers at Schiphol Airport, Amsterdam'
  },
  {
    src: 'https://res.cloudinary.com/dxa01fjve/image/upload/f_auto/v1764395987/IMG_6669_jocoex.jpg',
    caption: 'Hot Air Balloon, Napa Valley'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-i-ended-up-in-program-management',
    title: 'How I Ended Up in Program Management',
    date: 'Nov 29, 2025',
    excerpt: 'Looking back, my path into program management feels less like a single career decision and more like a natural fit that revealed itself over time.',
    category: 'Program Management',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    author: 'Apoorva Gururaja',
    content: `I didn't grow up knowing what program management was. Honestly, I didn't even know this job existed until I was already doing pieces of it without the title.

Looking back, my path into program management feels less like a single career decision and more like a natural fit that revealed itself over time.

When I started working in tech, I noticed something about myself: I cared about how things came together. Not just the feature, not just the code, and not just the business requirement, but the entire flow. The people involved, the decisions being made, the risks no one had flagged yet, and the customer experience on the other side.

I liked being the person who noticed the things that fall through the cracks.

At Amazon, Google, LinkedIn, and now in AI-driven startups, I kept gravitating toward the work that sat in the middle: coordinating across teams, bringing clarity when things were ambiguous, and making sure we were all moving in the same direction. I liked the combination of strategy, operations, problem solving, and communication. And I liked that every day looked different.

Over time, I realized the moments that energized me the most were the ones where I could help a team unblock something, simplify a problem, or bring structure to a messy initiative. I enjoyed taking something complex with multiple stakeholders, timelines, and unknowns, and turning it into a path forward.

That is when it clicked for me. This is program management.

It is not flashy. It is not loud. It is steady, thoughtful, and grounded in making things actually work. And that fits who I am.

I am someone who likes to understand the "why" behind decisions. I am someone who asks the questions that help teams get unstuck. And I am someone who enjoys being at the intersection of engineering, product, business, and operations, the place where the real coordination happens.

So why did I choose program management?

Because it aligns with how my mind works.

Because it lets me combine clarity, structure, and collaboration.

Because it puts me close to the problems that matter.

And because it gives me a front row seat to building products that make an impact.

It wasn't a dramatic career pivot. It was more like finally naming something I had been doing, and enjoying, all along.`
  }
];

export const LIFESTYLE_ITEMS: LifestyleItem[] = [
  {
    id: '1',
    name: 'Logitech MX Keys Mini',
    category: 'Desk',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'June 12, 2024'
  },
  {
    id: '2',
    name: 'Atomic Habits',
    category: 'Books',
    price: '$15',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'Jan 5, 2024'
  },
  {
    id: '3',
    name: 'Kindle Paperwhite',
    category: 'Tech',
    price: '$139',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'Nov 24, 2023'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    category: 'Tech',
    price: '$348',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'July 15, 2023'
  },
  {
    id: '5',
    name: 'Herman Miller Aeron',
    category: 'Desk',
    price: '$1200',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'Aug 10, 2024'
  },
  {
    id: '6',
    name: 'Hydro Flask 32oz',
    category: 'Wellness',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'May 02, 2024'
  },
  {
    id: '7',
    name: 'Canon EOS R6',
    category: 'Tech',
    price: '$2499',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'Dec 15, 2024'
  },
  {
    id: '8',
    name: 'Nespresso Vertuo',
    category: 'Desk',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1517080315808-b85ee707255f?q=80&w=400&auto=format&fit=crop',
    link: '#',
    purchaseDate: 'Oct 01, 2024'
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Ep 1: The Human Side of AI',
    date: 'Oct 20, 2025',
    duration: '45 min',
    description: 'Discussing how we keep humans in the loop as we build increasingly autonomous agents. We explore the ethical implications and the future of work.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da9e2cd6?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Ep 2: TPMs in the Age of Agility',
    date: 'Oct 05, 2025',
    duration: '32 min',
    description: 'How Technical Program Managers can drive value in fast-paced, agile environments without becoming blockers.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Ep 3: From "We Could" to "We Did"',
    date: 'Sep 15, 2025',
    duration: '50 min',
    description: 'A deep dive into execution strategies for large-scale migrations and system consolidations.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop'
  }
];

export const DESKTOP_ICONS = [
  { name: 'Resume_2025.pdf', type: 'pdf' },
  { name: 'Project_Specs', type: 'folder' },
  { name: 'Travel_Plans', type: 'folder' },
  { name: 'Screenshots', type: 'folder' },
];