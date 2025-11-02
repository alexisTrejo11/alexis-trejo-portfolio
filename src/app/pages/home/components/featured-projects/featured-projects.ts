import { Component } from '@angular/core';
import { Project } from '../../../../models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterModule],
  templateUrl: './featured-projects.html',
})
export class FeaturedProjects {
  // Dummy data for featured projects
  projects: Project[] = [
    {
      id: '1',
      title: 'Project One',
      description: 'Description for Project One',
      tags: ['Angular', 'TypeScript'],
      metrics: [
        { label: 'Stars', value: '150' },
        { label: 'Forks', value: '30' },
      ],
      image: 'assets/images/project-one.png',
      featured: true,
    },
    {
      id: '2',
      title: 'Project Two',
      description: 'Description for Project Two',
      tags: ['JavaScript', 'HTML'],
      metrics: [
        { label: 'Stars', value: '200' },
        { label: 'Forks', value: '40' },
      ],
      image: 'assets/images/project-two.png',
      featured: true,
    },
    {
      id: '3',
      title: 'Project Three',
      description: 'Description for Project Three',
      tags: ['CSS', 'Sass'],
      metrics: [
        { label: 'Stars', value: '100' },
        { label: 'Forks', value: '20' },
      ],
      image: 'assets/images/project-three.png',
      featured: true,
    },
    {
      id: '4',
      title: 'Project Four',
      description: 'Description for Project Four',
      tags: ['Python', 'Django'],
      metrics: [
        { label: 'Stars', value: '250' },
        { label: 'Forks', value: '50' },
      ],
      image: 'assets/images/project-four.png',
      featured: true,
    },
  ];
}
