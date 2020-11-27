import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DollhouseComponent } from './containers/dollhouse/dollhouse.component';
import { TourComponent } from './containers/tour/tour.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TourComponent,
  },
  {
    path: 'dollhouse',
    component: DollhouseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
