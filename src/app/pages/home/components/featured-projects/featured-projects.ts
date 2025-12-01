import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsGrid } from '../../../../shared/components/projects-grid/projects-grid';
import { Project } from '../../../../core/models/project-docts';
import { ProjectsService } from '../../../../services/projects.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterModule, ProjectsGrid],
  templateUrl: './featured-projects.html',
})
export class FeaturedProjects {
  featuredProjects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projectsService
      .getFeaturedProjects()
      .pipe(
        map((projects) => projects.slice(0, 3)),
        catchError((err) => {
          console.error('Error fetching featured projects:', err);
          return of([]);
        })
      )
      .subscribe((projects) => {
        this.featuredProjects = projects;
      });
  }
}
