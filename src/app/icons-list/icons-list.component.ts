import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons-list',
  template: `
    <div class="items-list content-container">
      <a *ngFor="let item of icons" class="item" [routerLink]="['/icon', item.id]">
        <img src="{{ item.icon }}">
        <p>{{ item.name }}</p>
      </a>
    </div>
  `,
  styleUrls: ['./icons-list.component.css']
})
export class IconsListComponent implements OnInit {
  //  這個data遲早要拆到service裡
  icons=[
    {
      id: 1,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 2,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 3,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 4,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 5,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 6,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 7,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 8,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
    {
      id: 9,
      name: 'mountain',
      icon: '../../assets/svg-icons/mountain.svg'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
