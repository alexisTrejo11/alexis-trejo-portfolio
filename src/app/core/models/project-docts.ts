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

export interface ProjectMediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  alt?: string;
  category?: 'screenshot' | 'diagram' | 'demo' | 'architecture';
}

export interface MediaGallerySection {
  title: string;
  description?: string;
  items: ProjectMediaItem[];
}

export interface ProjectOverview {
  problemStatement: OverviewProblemStatement;
  solution: OverviewSolution;
  keyMetrics: OverviewKeyMetrics;
}

export interface OverviewProblemStatement {
  problemTitle: string;
  problemDescription: string;
  problemList: string[];
}

export interface OverviewSolution {
  solutionTitle: string;
  solutionList: Solution[];
}

export interface Solution {
  title: string;
  description: string;
}

export interface OverviewKeyMetrics {
  metricsTitle: string;
  metricsList: string[];
}
