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
