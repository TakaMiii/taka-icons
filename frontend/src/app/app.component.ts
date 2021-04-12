import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInNav } from './animations'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInNav
  ]
})
export class AppComponent {
  title = 'taka-icons';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
