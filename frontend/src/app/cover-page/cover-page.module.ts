import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverPageComponent } from './cover-page.component';
import { WebOverviewComponent } from './web-overview/web-overview.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CoverPageComponent,
    WebOverviewComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class CoverPageModule { }
