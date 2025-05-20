import { Routes } from '@angular/router';
import { WheatherHomeComponent } from './modules/wheather/page/wheather-home/wheather-home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full'
  },
  {
    path: 'weather',
    component: WheatherHomeComponent
  }
];
