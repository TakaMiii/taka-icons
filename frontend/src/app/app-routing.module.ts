import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsListComponent } from './icons-list/icons-list.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';

const routes: Routes = [
  { path: '', component: IconsListComponent, data: {animation: 'IconsList'} },
  { path: 'icon/:id', component: IconDetailComponent, data: {animation: 'IconPage'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
