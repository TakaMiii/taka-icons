import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ColorInJson } from '../color-in-json';

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  styleUrls: ['./color-controller.component.css']
})
export class ColorControllerComponent implements OnInit {
  @Input() jsonFileColors:Array<ColorInJson>;
  @Output() changeColors = new EventEmitter();

  newColors:Array<string>=[];

  constructor() { }

  ngOnInit() {
  }

  setNewColor(val, i){
    if(val[0]==="#"){
      this.newColors[i]=val;
    }else{
      this.newColors[i]="#"+val;	
    }
  }

  change(){
  	this.changeColors.emit(this.newColors);
  }
}
