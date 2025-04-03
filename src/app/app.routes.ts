import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
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
    loadComponent: () => import('./playground/playground.component').then(m => m.PlaygroundComponent),
    title: 'Make a word',
  }
];
