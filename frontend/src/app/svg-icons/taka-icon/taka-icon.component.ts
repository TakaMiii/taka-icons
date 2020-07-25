import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-taka-icon',
  templateUrl: './taka-icon.component.svg',
  styleUrls: ['./taka-icon.component.css'],
})
export class TakaIconComponent implements OnInit {
  @Input() stroke: string;
  constructor() { }

  ngOnInit() {
  }
  downloadSvg(){
  	let svg = document.querySelector('.js-taka-svg').innerHTML;

  	let blob = new Blob(['<svg width="450px" height="450px" viewBox="0 0 450 450" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="js-taka-svg">'+svg.toString()+'</svg>']);
  	let element = document.createElement("a");

  	element.download = "taka-icon.svg";
  	element.href = window.URL.createObjectURL(blob);
  	element.click();
  	element.remove();
  }

}
