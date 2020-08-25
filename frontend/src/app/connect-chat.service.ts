import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectChatService {

  constructor() { }

  // private chatSocket:WebSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');
  private chatSocket:WebSocket = new WebSocket(environment.socketUrl);

  wsFaction(): Observable<any>{
    return new Observable(
      observer => {
        this.chatSocket.onmessage = (event) => observer.next(JSON.parse(event.data).message);
        this.chatSocket.onclose = (event) => console.error('Chat socket closed unexpectedly');
        this.chatSocket.onerror = (event) => observer.complete();
    })
  }

  sentMessage(msg, user){
  	if(this.chatSocket.readyState===1){
  	  this.chatSocket.send(JSON.stringify({
        'name': user,
  	    'message': msg
  	  }));
  	}
  }
}

