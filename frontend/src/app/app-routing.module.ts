import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IconsListComponent } from './icons-list/icons-list.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/icons', pathMatch: 'full' },
  { path: 'icons', component: IconsListComponent, data: {animation: 'IconsList'},},
  { path: 'icon/:id', component: IconDetailComponent, data: {animation: 'IconPage'} },
  { path: 'chart', component: ChartComponent, data: {animation: 'ChartPage'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
