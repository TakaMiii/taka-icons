import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ConnectChatService } from '../connect-chat.service';
import { FacebookLoginService } from '../facebook-login.service'

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
  cardWidth:number;
  cardHeight:number;
  cardLeft:number;
  cardTop:number;
  isLogin:boolean=false;
  user:{name:string}={
    name: "",
  };

  @ViewChild('chart',{read: ElementRef, static: true}) chart:ElementRef;
  @ViewChild('card',{read: ElementRef, static: true}) card:ElementRef;

  constructor(private chatService:ConnectChatService, public fbLoginService:FacebookLoginService) {}

  ngOnInit() {
    this.cardDrag();
  	this.chatService.wsFaction().subscribe(
      (event) => {this.messages.push(event)}
    );
    this.getUserInfo();
    this.runCanvas();
  }

  runCanvas(){
    let canvas = this.chart.nativeElement.querySelector('#dots');
    canvas.width = this.chart.nativeElement.offsetWidth;
    canvas.height = this.chart.nativeElement.offsetHeight;
    let ctx = canvas.getContext('2d');
    let minX = 80;
    let maxX = canvas.width - 80;
    let minY = 0;
    let maxY = canvas.height;
    let dotsPos=[{x:120, y:120, s: 130}, {x:350, y:500, s:80}, {x:650, y:200, s:120}];
    let moveTo =[{x: initMoveTo(), y: initMoveTo()}, {x:initMoveTo(), y:initMoveTo()}, {x:initMoveTo(), y:initMoveTo()}]
    
    function initMoveTo(){
      return Math.random()>0.5?1:-1;
    }

    function dot(x, y, size){
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFD1C4";
      ctx.fill();
      ctx.closePath();
    }

    let collide=(x, y, s)=>{
      let touchLeftTop, touchRightTop, touchLeftBottom, touchRightBottom, touchTop, touchBottom;
      function getDist(dx, dy){
        return Math.round(Math.sqrt(dx*dx + dy*dy));
      }
      touchLeftTop = getDist(x - this.cardLeft, y - this.cardTop)
      if(touchLeftTop<s){
        return [-10, -10];
      }
      touchRightTop = getDist(x - (this.cardWidth + this.cardLeft), y - this.cardTop)
      if(touchRightTop<s){
        return [10, -10];
      }
      touchLeftBottom = getDist(x - this.cardLeft, y - (this.cardTop + this.cardHeight));
      if(touchLeftBottom<s){
        return [-10, 10];
      }
      touchRightBottom = getDist(x - (this.cardWidth + this.cardLeft), y - (this.cardTop + this.cardHeight))
      if(touchRightBottom<s){
        return [10, 10];
      }
      touchTop = getDist(x - (this.cardLeft + this.cardWidth/2), y - this.cardTop);
      if(touchTop<s){
        return [1, -10];
      }
      touchBottom = getDist(x - (this.cardLeft + this.cardWidth/2), y - (this.cardTop + this.cardHeight));
      if(touchBottom<s){
        return [-1, 10];
      }
      return false;
    }

    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i=0; i<dotsPos.length; i++){
        dot(dotsPos[i].x, dotsPos[i].y, dotsPos[i].s);

        if(dotsPos[i].x <= minX){
          moveTo[i].x = 1;
        }

        if(dotsPos[i].x>=maxX){
          moveTo[i].x = -1;
        }

        if(dotsPos[i].y <= minY){
          moveTo[i].y = 1;
        }

        if(dotsPos[i].y >= maxY){
          moveTo[i].y = -1;
        }

        let touchCard = collide(dotsPos[i].x, dotsPos[i].y, dotsPos[i].s);
        if(touchCard){
          moveTo[i].x = touchCard[0];
          moveTo[i].y = touchCard[1];
        }

        dotsPos[i].x += moveTo[i].x;
        dotsPos[i].y += moveTo[i].y;
      }
    }

    for(let i=0; i<dotsPos.length; i++){
      new dot(dotsPos[i].x, dotsPos[i].y, dotsPos[i].s);
    }

    setInterval(draw, 80);
  }

  cardDrag(){
    let elmnt = this.card.nativeElement;
    let chart = this.chart.nativeElement;

    this.cardWidth = elmnt.offsetWidth;
    this.cardHeight = elmnt.offsetHeight;
    let initLeft = this.chart.nativeElement.clientWidth - (this.cardWidth + 20);
    let initTop = this.chart.nativeElement.clientHeight - (this.cardHeight * 2.4);
    this.pos3 = initLeft;
    this.pos4 = initTop;

    this.cardLeft = initLeft;
    this.cardTop = initTop;

    let onDragStart = (e)=>{
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      
      elmnt.onmouseup = closeDrag;
      chart.onmouseup = closeDrag;
      chart.onmousemove = onDraging;
    }

    let onDraging = (e)=>{
      e.preventDefault();
      
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;

      this.cardLeft = elmnt.offsetLeft - this.pos1;
      this.cardTop =  elmnt.offsetTop - this.pos2;

      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
    }

    function closeDrag(){
      chart.onmousemove = null;
      chart.onmouseup = null;
      elmnt.onmouseup = null;
    }
    elmnt.onmousedown = onDragStart;
  }

  sentMsgToWS(){
  	this.chatService.sentMessage(this.message, this.user.name);
    this.message = "";
  }

  getUserInfo(){
    this.fbLoginService.getLoginStatus().subscribe(
      event=>{
        this.isLogin = event;

        if(this.fbLoginService.user) {
          this.user.name = this.fbLoginService.user.name;
        }
        let card = this.card.nativeElement;
        this.cardHeight = card.offsetHeight;
      },
      err=>{
        console.log(err)
      }
    )
  }

  signOut(){
    this.fbLoginService.signOut().subscribe((event)=>{
      this.getUserInfo();
    });
  }
}
