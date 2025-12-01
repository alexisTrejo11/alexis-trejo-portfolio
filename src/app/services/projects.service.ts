import { inject, Injectable } from '@angular/core';
import { Project } from '../core/models/project-docts';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private projectsUrl = 'data/projects.json';
  private projectsCache: Project[] | null = null;

  getAllProjects(): Observable<Project[]> {
    if (this.projectsCache) {
      return of(this.projectsCache);
    }

    return this.http.get<Project[]>(this.projectsUrl).pipe(
      map((projects) => {
        this.projectsCache = projects;
        return projects;
      })
    );
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.getAllProjects().pipe(map((projects) => projects.find((p) => p.id === id)));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getAllProjects().pipe(map((projects) => projects.filter((p) => p.featured)));
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.category === category))
    );
  }

  getProjectsByStatus(status: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.status === status))
    );
  }

  getProjectsByType(type: string): Observable<Project[]> {
    return this.getAllProjects().pipe(map((projects) => projects.filter((p) => p.type === type)));
  }

  searchProjects(term: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        if (!term.trim()) return projects;

        const searchTerm = term.toLowerCase();
        return projects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.fullDescription.toLowerCase().includes(searchTerm) ||
            project.shortDescription.toLowerCase().includes(searchTerm) ||
            project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm)) ||
            project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      })
    );
  }

  filterProjects(filters: {
    category?: string;
    status?: string;
    type?: string;
    technologies?: string[];
    year?: number;
    featured?: boolean;
  }): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        return projects.filter((project) => {
          if (filters.category && project.category !== filters.category) {
            return false;
          }

          if (filters.status && project.status !== filters.status) {
            return false;
          }

          if (filters.type && project.type !== filters.type) {
            return false;
          }

          if (filters.technologies && filters.technologies.length > 0) {
            const hasAllTech = filters.technologies.every((tech) =>
              project.technologies.includes(tech)
            );
            if (!hasAllTech) return false;
          }

          if (filters.year && project.year !== filters.year) {
            return false;
          }

          if (filters.featured !== undefined && project.featured !== filters.featured) {
            return false;
          }

          return true;
        });
      })
    );
  }

  getAllTechnologies(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const allTech = projects.flatMap((p) => p.technologies);
        return [...new Set(allTech)].sort();
      })
    );
  }

  getAllTags(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const allTags = projects.flatMap((p) => p.tags);
        return [...new Set(allTags)].sort();
      })
    );
  }

  getProjectStats(): Observable<{
    total: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
  }> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const byCategory: Record<string, number> = {};
        const byStatus: Record<string, number> = {};
        const byType: Record<string, number> = {};

        projects.forEach((project) => {
          // Contar por categoría
          byCategory[project.category] = (byCategory[project.category] || 0) + 1;

          // Contar por estado
          byStatus[project.status] = (byStatus[project.status] || 0) + 1;

          // Contar por tipo
          byType[project.type] = (byType[project.type] || 0) + 1;
        });

        return {
          total: projects.length,
          byCategory,
          byStatus,
          byType,
        };
      })
    );
  }
}
