import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectHeader } from './components/project-header/project-header';

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: string;
  timeline: string;
  team: string;
  role: string;
}

@Component({
  selector: 'app-overview',
  imports: [CommonModule, ProjectHeader],
  templateUrl: './overview.html',
})
export class Overview implements OnInit {
  projectData: ProjectData = {
    id: '',
    title: '',
    tagline: '',
    description: '',
    status: '',
    timeline: '',
    team: '',
    role: '',
  };

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const projectId = this.route.parent?.snapshot.params['projectId'];
    this.loadProjectData(projectId);
  }

  private loadProjectData(projectId: string) {
    // Mock data for demonstration purposes
    this.projectData = {
      id: 'project1',
      title: 'Project One',
      tagline: 'An innovative project that revolutionizes technology.',
      description:
        'This project aims to create a cutting-edge solution that addresses modern challenges in the tech industry.',
      status: 'In Progress',
      timeline: 'Jan 2023 - Dec 2023',
      team: 'Alice, Bob, Charlie',
      role: 'Lead Developer',
    };
  }
}
