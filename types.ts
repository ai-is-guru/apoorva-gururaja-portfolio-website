
export interface Job {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  content?: string; // Full blog post content
  author?: string; // Author name
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Passion {
  title: string;
  description: string;
  icon: string;
}

export interface LifestyleItem {
  id: string;
  name: string;
  category: 'Tech' | 'Desk' | 'Wellness' | 'Books';
  price?: string;
  image: string;
  link: string;
  purchaseDate?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  image: string;
}
