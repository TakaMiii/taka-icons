import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ConnectChatService } from '../connect-chat.service'
import { fromEvent }  from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  move;

  @ViewChild('chart',{read: ElementRef, static: true}) chart:ElementRef;
  @ViewChild('card',{read: ElementRef, static: true}) card:ElementRef;

  constructor(private chatService:ConnectChatService) {}

  ngOnInit() {
    this.initChatInputCard();
  	this.chatService.wsFaction().subscribe(
      (event) => {this.messages.push(event)}
    )

    this.move = fromEvent(this.chart.nativeElement, 'mousemove');

    this.move.pipe(debounceTime(5)).subscribe((e:MouseEvent)=>{
      if(this.canMove){
        e.preventDefault();
        this.onDraging(e);
      }
    })
  }

  initChatInputCard(){
    let elmnt = this.card.nativeElement;
    let cardWidth = elmnt.offsetWidth;
    let cardHeight = elmnt.offsetHeight;

    let initLeft = document.body.clientWidth - (cardWidth + 20);
    let initTop = document.body.clientHeight - (cardHeight + 128);

    this.pos3 = initLeft;
    this.pos4 = initTop;

    elmnt.style.top = initTop+'px';
    elmnt.style.left = initLeft+'px';
  }

  onDragStart(e){
  	this.pos3 = e.clientX;
  	this.pos4 = e.clientY;
  	this.canMove = true;
  }

  onDraging(e){
    let elmnt = this.card.nativeElement;
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;

    elmnt.style.left = (elmnt.offsetLeft - this.pos1) + 'px';
    elmnt.style.top =  (elmnt.offsetTop - this.pos2) + 'px';

    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
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
