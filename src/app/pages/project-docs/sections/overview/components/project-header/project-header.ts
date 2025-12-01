import { Component, input } from '@angular/core';
import { ProjectData } from '../../overview';

@Component({
  selector: 'app-project-header',
  imports: [],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  projectData = input.required<ProjectData>();
  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'production':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'development':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'archived':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  }
}
