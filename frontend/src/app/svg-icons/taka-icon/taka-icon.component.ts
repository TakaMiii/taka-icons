import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IconService } from '../../icon.service';

@Component({
  selector: 'app-taka-icon',
  templateUrl: './taka-icon.component.svg',
  styleUrls: ['./taka-icon.component.css'],
})
export class TakaIconComponent implements OnInit {
  @Input() stroke: string;
  iconTemplate:object;
  // svgId

  constructor(public IconService: IconService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.IconService.currentSvg){
      this.iconTemplate = this.IconService.currentSvg;
    }else{
      let id = this.route.snapshot.params.id;

      let getIcon = this.IconService.getIcon(id)
        .subscribe(()=>{
          this.iconTemplate = this.IconService.currentSvg;
        })
    }
  }

  ngOnChanges(changes: SimpleChange){
    this.bindColorToEl();
  }

  bindColorToEl(){
    let svgPath = document.getElementsByClassName("js-icon-path");

    for(let i=0; i<svgPath.length; i++) {
      (svgPath[i]as HTMLElement).setAttribute("stroke", `${ this.stroke }`)
    }
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
