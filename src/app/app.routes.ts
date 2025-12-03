import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { projectDocsRoutes } from './pages/project-docs/project-docs.routes';
import { ProjectDocs } from './pages/project-docs/project-docs';
import { ProjectsList } from './pages/projects-list/projects-list';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'projects/:projectId',
    component: ProjectDocs,
    children: projectDocsRoutes,
  },
  {
    path: 'projects',
    component: ProjectsList,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
