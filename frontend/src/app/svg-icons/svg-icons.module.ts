import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TakaIconComponent } from './taka-icon/taka-icon.component';

@NgModule({
  declarations: [TakaIconComponent],
  imports: [
    CommonModule
  ],
  exports: [TakaIconComponent]
})
export class SvgIconsModule { }
