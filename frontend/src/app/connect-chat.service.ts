import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectChatService {

  constructor() { }

  private chatSocket:WebSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');
  wsFaction(){
    this.chatSocket.onmessage = (e)=>{ console.log(e.data)};
    this.chatSocket.onclose = (e)=>{ console.error('Chat socket closed unexpectedly'); }
    this.chatSocket.onerror = (e)=>{console.log(e)};
  }

  sentMessage(msg){
  	if(this.chatSocket.readyState===1){
      console.log(msg);
  	  this.chatSocket.send(JSON.stringify({
  	    'message': msg
  	  }));
  	}

  }
}

