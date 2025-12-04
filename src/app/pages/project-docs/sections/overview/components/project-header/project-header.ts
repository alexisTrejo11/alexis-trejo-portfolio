import { Component, input } from '@angular/core';
import { Project } from '../../../../../../core/models/project';
import { CommonModule } from '@angular/common';
import { Badge } from '../../../../../../shared/components/badge/badge';

@Component({
  selector: 'app-project-header',
  imports: [CommonModule, Badge],
  templateUrl: './project-header.html',
})
export class ProjectHeader {
  project = input.required<Project>();

  getStatusDisplay(status: Project['status']): string {
    const statusMap: Record<Project['status'], string> = {
      production: 'Production',
      development: 'Development',
      archived: 'Archived',
    };
    return statusMap[status] || status;
  }

  getStatusColor(status: Project['status']): string {
    const colors: Record<Project['status'], string> = {
      production: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      development: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return colors[status] || colors.development;
  }

  getTypeDisplay(type: Project['type']): string {
    const typeMap: Record<Project['type'], string> = {
      microservices: 'Microservices Architecture',
      api: 'API & Services',
      'web-app': 'Web Application',
      mobile: 'Mobile Application',
      library: 'Library/Package',
    };
    return typeMap[type] || type;
  }

  getCategoryDisplay(category: Project['category']): string {
    const categoryMap: Record<Project['category'], string> = {
      backend: 'Backend',
      frontend: 'Frontend',
      fullstack: 'Full Stack',
      devops: 'DevOps & Infrastructure',
    };
    return categoryMap[category] || category;
  }

  getProjectStats() {
    return {
      technologiesCount: this.project().technologies.length,
      featuresCount: this.project().features.length,
      metricsCount: this.project().metrics.length,
    };
  }

  getActionLinks() {
    return {
      github: this.project().links.github,
      demo: this.project().links.demo,
      documentation: this.project().links.documentation,
      dockerHub: this.project().links.dockerHub,
    };
  }

  getMainMetrics(): Project['metrics'] {
    return this.project().metrics.slice(0, 3);
  }
}
