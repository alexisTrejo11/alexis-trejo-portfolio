export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'devops';
  type: 'microservices' | 'api' | 'web-app' | 'mobile' | 'library';
  status: 'production' | 'development' | 'archived';
  featured: boolean;
  year: number;
  technologies: string[];
  tags: string[];
  metrics: ProjectMetric[];
  links: ProjectLinks;
  features: string[];
  images: ProjectImages;
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  type?: string;
  technologies?: string[];
  year?: number;
  featured?: boolean;
  searchTerm?: string;
}

export interface ProjectLinks {
  github: string | null;
  demo: string | null;
  documentation: string | null;
  dockerHub: string | null;
}

export interface ProjectImages {
  cover: string | null;
  screenshots: string[];
  diagram: string | null;
}

export enum ProjectCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  FULLSTACK = 'Fullstack',
  DEVOPS = 'DevOps',
}

export interface Technology {
  name: string;
  category: string;
  usage: string;
  icon: string;
  version?: string;
}

export interface MediaItem {
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  altText?: string;
}

export interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  external: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  subsections?: ProjectSection[];
}

export interface ProjectNavItem {
  label: string;
  path: string;
  icon: string;
}
