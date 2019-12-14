import { IChatMessage } from './../Models/IChat';
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Subject } from 'rxjs/internal/Subject';
import { map, catchError } from 'rxjs/operators';
const CHAT_URL = 'wss://hack.chat/chat-ws';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  public messages: Subject<IChatMessage>;
  public ws :WebSocket;
  isConnected:boolean = false;
  constructor(private wsService: WebSocketService) { 
     this.makeConnection();
  }

   makeConnection(){
    this.ws = this.wsService.makeConnection(CHAT_URL);
     
  }

  send(data){
      if (this.ws && this.ws.readyState == this.ws.OPEN) {
        this.ws.send(JSON.stringify(data));
      
    }
   
  }

  isOpen(): boolean{
    this.ws.onopen = () =>{
      this.isConnected = true;
    }
    return this.isConnected
  }

  joinChannel(){

  }
  
  getMessage(): any{
    let args = this.messages;
    if(this.isConnected){
      this.ws.onmessage = (message: MessageEvent) =>{
          args = JSON.parse(message.data); 
      }
      return args;
    }
  }

}
