import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconsModule } from './svg-icons/svg-icons.module';
import { CoverPageModule } from './cover-page/cover-page.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { IconsListComponent } from './icons-list/icons-list.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';
import { ChartComponent } from './chart/chart.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICONS} from 'ng-zorro-antd/icon';
import { LogoutOutline, DragOutline, FacebookFill } from '@ant-design/icons-angular/icons';
import { AppRoutingModule } from './app-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { ColorAnalysisComponent } from './color-analysis/color-analysis.component';


registerLocaleData(zh);
const icons: IconDefinition[] = [ LogoutOutline, DragOutline, FacebookFill ];

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2714054852029779')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    IconsListComponent,
    NavComponent,
    IconDetailComponent,
    ChartComponent,
    AboutMeComponent,
    ColorAnalysisComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzIconModule,
    SvgIconsModule,
    SocialLoginModule,
    AppRoutingModule,
    CoverPageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN},
    { provide: NZ_ICONS, useValue: icons },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
