import { Component } from '@angular/core';
import { Technology } from '../../../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  imports: [CommonModule],
  templateUrl: './tech-stack.html',
})
export class TechStack {
  technologies: Technology[] = [
    { name: 'Python', category: 'Language', icon: '🐍', color: 'text-blue-500' },
    { name: 'Git', category: 'Version Control', icon: '🔧', color: 'text-orange-600' },
    { name: 'Docker', category: 'Containerization', icon: '🐳', color: 'text-blue-400' },
    { name: 'Java', category: 'Language', icon: '☕', color: 'text-red-700' },
    { name: 'TypeScript', category: 'Language', icon: 'TS', color: 'text-blue-600' },
    { name: 'Angular', category: 'Framework', icon: '🅰️', color: 'text-red-500' },
    { name: 'Spring Boot', category: 'Framework', icon: '🌱', color: 'text-green-600' },
    { name: 'Django', category: 'Framework', icon: '🌐', color: 'text-green-800' },
    { name: 'FastAPI', category: 'Framework', icon: '⚡', color: 'text-pink-500' },
    { name: 'Gin', category: 'Framework', icon: '🍸', color: 'text-teal-500' },
    { name: 'RabbitMQ', category: 'Messaging Queue', icon: '🐇', color: 'text-red-400' },
    { name: 'Fiber (Go)', category: 'Framework', icon: '🌾', color: 'text-blue-700' },
    { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'text-indigo-600' },
    { name: 'Redis', category: 'Database', icon: '🧠', color: 'text-red-600' },
    { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'text-green-600' },
    { name: 'HTML5', category: 'Other', icon: '📄', color: 'text-orange-500' },
    { name: 'CSS3', category: 'Other', icon: '🎨', color: 'text-blue-500' },
    { name: 'Linux', category: 'Other', icon: '🐧', color: 'text-black' },
    { name: 'GraphQL', category: 'Other', icon: '🔺', color: 'text-pink-600' },
    { name: 'Graphic Design', category: 'Other', icon: '🎨', color: 'text-purple-500' },
  ];

  categories = [
    'Language',
    'Framework',
    'Database',
    'Version Control',
    'Containerization',
    'Messaging Queue',
    'Other',
  ];

  selectedCategory: string = 'All';

  get filteredTechnologies(): Technology[] {
    return this.selectedCategory === 'All'
      ? this.technologies
      : this.technologies.filter((t) => t.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
