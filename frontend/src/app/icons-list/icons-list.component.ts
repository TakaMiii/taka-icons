import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconService } from '../icon.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icons-list',
  template: `
    <div class="items-list content-container" *ngIf="icons">
      <a *ngFor="let item of icons" class="item" [routerLink]="['/icon', item.id]" (click)="selectIcon(item.id)">
        <div class="svg-icon" [innerHTML]="item.file"></div>
        <p>{{ item.name }}</p>
      </a>
    </div>
  `,
  styleUrls: ['./icons-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class IconsListComponent implements OnInit {
  icons:Object[];
  storke:string = "#000000";
  constructor(public IconService: IconService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getIcons();
  }

  getIcons() {
    this.IconService.getIcons().subscribe(
      (data:Array<any>) => {
        this.icons = data;
      },
      err=> {
        console.log('errors already caught... will not run');
      }
    );
  }

  selectIcon(id) {
    this.IconService.currentSvg = this.icons.find(item => item['id'] === id)['file'];
  }
}
