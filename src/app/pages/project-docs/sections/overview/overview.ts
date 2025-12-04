import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectHeader } from './components/project-header/project-header';
import { ProjectsService } from '../../../../services/projects.service';
import { Project } from '../../../../core/models/project';
import { Subject, takeUntil } from 'rxjs';
import { TechStackShowcase } from './components/tech-stack-showcase/tech-stack-showcase';
import { QuickLinks } from './components/quick-links/quick-links';
import { MediaGallery } from './components/media-gallery/media-gallery';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, ProjectHeader, TechStackShowcase, QuickLinks, MediaGallery],
  templateUrl: './overview.html',
})
export class Overview implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectsService);

  projectData: Project | null = null;
  isLoading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.parent?.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const projectId = params['projectId'];
      if (projectId) {
        this.loadProjectData(projectId);
      } else {
        this.error = 'Project ID not found';
        console.error(this.error);
        this.isLoading = false;
      }
    });
  }

  private loadProjectData(projectId: string) {
    this.isLoading = true;
    this.error = null;

    this.projectService
      .getProjectById(projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project) => {
          this.projectData = project || null;
          this.isLoading = false;
          console.log('Project data loaded successfully:', this.projectData);
        },
        error: (error) => {
          console.error('Error loading project data:', error);
          this.error = 'Failed to load project data. Please try again.';
          console.error(this.error);
          this.isLoading = false;
        },
      });
  }

  reload(): void {
    const projectId = this.route.parent?.snapshot.params['projectId'];
    if (projectId) {
      this.loadProjectData(projectId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
