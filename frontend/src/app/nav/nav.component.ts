import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  canBack:boolean;

  constructor(private router: Router) { 
    router.events.subscribe(val => {
      if(val instanceof NavigationEnd){
      	this.canBack = val.url.match(/icon\/\d/)?true:false;
      }
    })
  }

  ngOnInit() {
  	
  }
}
