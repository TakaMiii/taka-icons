import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NZ_ICONS} from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AnimationReaderComponent } from './animation-reader/animation-reader.component';
import { ColorControllerComponent } from './color-controller/color-controller.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AnimationReaderComponent, ColorControllerComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    FormsModule,
    LottieAnimationViewModule.forRoot()
  ]
})
export class JsonAnimationModule { }
