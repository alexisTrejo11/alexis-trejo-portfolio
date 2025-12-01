import { Routes } from '@angular/router';
import { ProjectDocs } from './project-docs';
import { Overview } from './sections/overview/overview';

export const projectDocsRoutes: Routes = [
  {
    path: ':projectId',
    component: ProjectDocs,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: Overview,
      },
    ],
  },
];
