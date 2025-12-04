import {
  ProjectImages,
  ProjectLinks,
  ProjectMetric,
  ProjectOverview,
  ProjectMediaItem,
} from './project-docts';

export interface Project {
  id: string;
  // general info
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'devops';
  type: 'microservices' | 'api' | 'web-app' | 'mobile' | 'library';
  status: 'production' | 'development' | 'archived';
  featured: boolean;
  year: number;
  images: ProjectImages;

  // detailed info
  technologies: string[];
  tags: string[];
  features: string[];
  metrics: ProjectMetric[];
  links: ProjectLinks;

  mediaGallery?: ProjectMediaItem[];
  // Aggregated sections
  overview: ProjectOverview;
}

export interface Technology {
  name: string;
  category: string;
  usage: string;
  icon: string;
  version?: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  alt?: string;
}

export interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  external: boolean;
}
