import { Routes } from '@angular/router';

/**
 * Each page is lazy-loaded: its code is only downloaded when someone opens it,
 * which keeps the first load of the site small.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Khaled Alkuhaily | Unity Developer',
    data: {
      description:
        'Khaled Alkuhaily is a Unity developer focused on gameplay programming, with backend experience in Spring Boot and MySQL.',
    },
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: 'About | Khaled Alkuhaily',
    data: { description: 'About Khaled Alkuhaily: Unity developer with a Computer Science background.' },
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'projects',
    title: 'Projects | Khaled Alkuhaily',
    data: { description: 'Unity games and backend web projects by Khaled Alkuhaily.' },
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
  },
  {
    // The details page sets its own title from the project name
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details').then((m) => m.ProjectDetails),
  },
  {
    path: 'contact',
    title: 'Contact | Khaled Alkuhaily',
    data: { description: 'Get in touch with Khaled Alkuhaily about Unity developer roles.' },
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    // Any other URL shows a friendly 404 page instead of silently going home
    path: '**',
    title: 'Page not found | Khaled Alkuhaily',
    data: { description: 'This page does not exist.' },
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
