export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  icon: string;
  color: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  description?: string;
  projectsCount?: number;
  yearsExperience?: number;
}

export type TechCategory =
  | 'language'
  | 'backend-framework'
  | 'frontend-framework'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'tool'
  | 'other';

export interface TechCategoryInfo {
  id: TechCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface Expertise {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  duration: number;
}
