export interface Project {
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
