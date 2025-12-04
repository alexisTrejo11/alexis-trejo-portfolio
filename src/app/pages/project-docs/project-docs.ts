import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectNavItem } from '../../core/models/project-docts';

@Component({
  selector: 'app-project-docs',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-docs.html',
})
export class ProjectDocs implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  projectId: string = '';
  isSidebarOpen = false;

  navItems: ProjectNavItem[] = [
    { label: 'Overview', path: 'overview', icon: '📋' },
    { label: 'Architecture', path: 'architecture', icon: '🏗️' },
    { label: 'Code Showcase', path: 'code', icon: '💻' },
    { label: 'API Explorer', path: 'api', icon: '🔌' },
    { label: 'Features', path: 'features', icon: '✨' },
    { label: 'Infrastructure', path: 'infrastructure', icon: '☁️' },
  ];

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.projectId = params['projectId'];
      console.log('Project ID loaded:', this.projectId);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    // Evitar scroll en body cuando sidebar está abierto
    if (this.isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    document.body.style.overflow = '';
  }
}
