import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.Ti) }
];
