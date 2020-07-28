import { Component, OnInit} from '@angular/core';
import { ConnectChatService } from '../connect-chat.service'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  oldMousePos: Object = { x:Number, y:Number};
  cardBindingPosition:Object = { x:null, y:null};
  canMove:boolean=false;
  message:string;

  constructor(private chatService:ConnectChatService) { }

  ngOnInit() {
  	let elmnt = document.querySelector('.js-card') as HTMLElement;
  	let cardWidth = elmnt.offsetWidth;
  	let cardHeight = elmnt.offsetHeight;

  	this.cardBindingPosition['x'] = document.body.clientWidth - (cardWidth + 20);
  	this.cardBindingPosition['y'] = document.body.clientHeight - (cardHeight + 185);

  	this.chatService.wsFaction();
  }

  onDragStart(e){
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

  sentMsgToWS(){
  	console.log('訊息');
  	this.chatService.sentMessage(this.message);
  }



}
