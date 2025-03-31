import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Us',
    },
    {
      path: 'playground',
      component: PlaygroundComponent,
      title: 'Make a word',
    }
];
