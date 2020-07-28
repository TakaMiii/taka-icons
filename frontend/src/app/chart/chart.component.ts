import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  oldMousePos: Object = { x:Number, y:Number};
  cardBindingPosition:Object = { x:10, y:10};
  canMove:boolean=false;

  constructor() { }

  ngOnInit() {

  }

  onDragStart(e){
  	// e.preventDefault();

  	this.oldMousePos['x'] = e.clientX;
  	this.oldMousePos['y'] = e.clientY;

  	this.canMove = true;
  }

  onDraging(e){
  	e.preventDefault();
  	if(this.canMove){

  	  this.cardBindingPosition['x'] = this.cardBindingPosition['x'] - (this.oldMousePos['x'] - e.clientX);
  	  this.cardBindingPosition['y'] = this.cardBindingPosition['y'] - (this.oldMousePos['y'] - e.clientY);

  	  this.oldMousePos['x'] = e.clientX;
  	  this.oldMousePos['y'] = e.clientY;
  	}

  }

  closeDrag(e){
  	this.canMove=false;
  }



}
