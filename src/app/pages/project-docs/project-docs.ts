import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectNavItem } from '../../core/models/project-docts';

@Component({
  selector: 'app-project-docs',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-docs.html',
})
export class ProjectDocs implements OnInit, OnDestroy {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.projectId = params['projectId'];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
