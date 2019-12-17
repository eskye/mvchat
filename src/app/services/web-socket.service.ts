import { IChatMessage } from './../Models/IChat';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService { 
  constructor() { }
  private subject: Subject<MessageEvent>;
  
  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }
  
  public makeConnection(url): WebSocket{
    let ws = new WebSocket(url);
    return ws;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
