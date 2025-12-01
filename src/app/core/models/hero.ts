export interface Technology {
  name: string;
  category: string;
  icon: string;
  color: string;
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

export interface FeatureProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  featured: boolean;
}
