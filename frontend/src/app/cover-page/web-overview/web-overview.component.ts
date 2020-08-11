import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { animation, transition, animate, trigger, state, style } from '@angular/animations';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-web-overview',
  templateUrl: './web-overview.component.html',
  styleUrls: ['./web-overview.component.css'],
  animations: [
    trigger('skewUpright', [
      // ...
      state('skew', style({
        transform: 'skewX(-5deg)'
      })),
      state('upright', style({
        transform: 'skewX(0deg)'
      })),
      transition('skew => upright', [
        animate('0.3s ease-in')
      ]),
      transition('upright => skew', [
        animate('0.9s ease-in')
      ]),
    ]),
  ],
})

export class WebOverviewComponent implements OnInit {
  skew:boolean=false;
  contents = [
    {
      title: 'Download SVG icons',
      text: '下載SVG icons<br>根據上傳的圖片，改變 icon 顏色<br>再多寫一些些字看會怎樣'
    },
    {
      title: 'Chat room',
      text: '登入Faceebook帳號，使用聊天室<br>再多寫一些些字看會怎樣'
    }
  ]

  scroll = fromEvent(window, 'scroll').pipe(
    map(() => {}, debounceTime(30)),
  );


  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  	this. scroll.subscribe(() => {
       this.skew = true;
       setTimeout(()=>{this.stopSkew()}, 1000);
    });
  }

  stopSkew() {
  	this.skew = false;
  }

}