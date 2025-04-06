import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    title: 'About Us',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery',
  },
  {
    path: 'playground',
    title: 'Make a word',
    redirectTo: '/playground/',
    pathMatch: 'full',
  },
  {
    path: 'playground/:letterIds',
    title: 'Make a word',
    loadComponent: () => import('./playground/playground.component').then(m => m.PlaygroundComponent),
  },
];
