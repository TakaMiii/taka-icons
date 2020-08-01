import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectChatService } from '../connect-chat.service'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  pos1:number;
  pos2:number;
  pos3:number;
  pos4:number;
  canMove:boolean=false;
  messages:Array<string>=[];
  message:string;
  cardLeft:number;
  cardTop:number;

  @ViewChild('chart',{read: ElementRef, static: true}) chart:ElementRef;
  @ViewChild('card',{read: ElementRef, static: true}) card:ElementRef;

  constructor(private chatService:ConnectChatService) {}

  ngOnInit() {
    this.initChatInputCard();
  	this.chatService.wsFaction().subscribe(
      (event) => {this.messages.push(event)}
    )
  }

  initChatInputCard(){
    let elmnt = this.card.nativeElement;
    let cardWidth = elmnt.offsetWidth;
    let cardHeight = elmnt.offsetHeight;

    let initLeft = this.chart.nativeElement.clientWidth - (cardWidth + 20);
    let initTop = this.chart.nativeElement.clientHeight - (cardHeight + 56);

    this.pos3 = initLeft;
    this.pos4 = initTop;

    this.cardLeft = initLeft;
    this.cardTop = initTop;
  }

  onDragStart(e){
  	this.pos3 = e.clientX;
  	this.pos4 = e.clientY;
  	this.canMove = true;
  }

  onDraging(e){
    if(this.canMove){
      e.preventDefault();
      let elmnt = this.card.nativeElement;
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;

      this.cardLeft = elmnt.offsetLeft - this.pos1;
      this.cardTop =  elmnt.offsetTop - this.pos2;

      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
    }
  }

  closeDrag(){
    if(this.canMove) {
      this.canMove=false;
    }
  }

  sentMsgToWS(){
  	this.chatService.sentMessage(this.message);
  }
}
