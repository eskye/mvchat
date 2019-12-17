import { IChatGeneric } from './../../Models/IChat';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketSubject } from "rxjs/webSocket"; 
import { isNullOrUndefined } from 'util';

const CHAT_URL = 'wss://hack.chat/chat-ws';
const channelKey = 'channel';
const nickName = 'nick-name';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket$: WebSocketSubject<IChatGeneric<any>>;
  
  serverMessages: Array<IChatGeneric<any>> = [];

  @ViewChild('viewer',{static:true}) private viewer: ElementRef;

  sender: any;

  nick: string = '';
  message = '';
  item:any = {};
  
  showForm = false;
  users: Array<IChatGeneric<any>> = [];

  constructor(private chatService: ChatService) { 
    this.socket$ = new WebSocketSubject(CHAT_URL);
  }

  ngOnInit() {
    this.makeConnection();
    if(this.checkIfNameExist()){
      this.showForm = false; 
      this.item.channel = this.channel;
      this.item.nick = this.nickName;
      this.joinChannel();
    }else{
      this.showForm = true
    }
  }

  makeConnection(){
    this.socket$.subscribe(
      (message) => this.serverMessages.push(message) && this.scroll(),
      (err) => console.error(err),
      () => console.warn('Completed!'));
  }
   
 
  public joinChannel(): void { 
    if(this.item){ 
      this.item.cmd = 'join'
        const message:IChatGeneric<any> = this.item;
        this.serverMessages.push(message);
        this.socket$.next(message);
      if(isNullOrUndefined(this.nickName) && isNullOrUndefined(this.channel)){
        
        this.setItem(nickName, this.item.nick);
        this.setItem(channelKey, this.item.channel);
      }
     this.item = {};
      this.checkIfNameExist();
      // this.clientMessage = '';
      this.scroll();
    } 
    
}

checkIfNameExist(){
  let name = this.getItem(nickName);
  if(name){ this.showForm = false; return true;}
  this.showForm = true;
  return false;
}

sendChat(item){
  if(item && this.message){
    item.cmd = 'chat';
    item.text = this.message;
    const message:IChatGeneric<any> = item;
      this.serverMessages.push(message);
      this.socket$.next(message);
      this.message = '';
  }
  return false;
  
}
get cmd(){
  let text = this.serverMessages.find( x => (<any>x).cmd === 'warn');
 //  console.log(text);
  return text;
  
}
onKeydown(e){
  if(e.key === 'Enter'){
     this.sendChat(this.item);
  }
  
   
}

submitChat(){
  this.sendChat(this.item);
}


  getHelp(){
    const message:IChatGeneric<any> = { cmd: 'help', command: 'chat'}
    this.serverMessages.push(message);
    this.socket$.next(message);
    // this.clientMessage = '';
    this.scroll();
  }

  //Admin functions

  adminCommands(cmd:string, param:string, key:string){
    let message:IChatGeneric<any> = {};
    if(key === 'nick'){
      message = { cmd: cmd, nick:param}
    }else if(key === 'text'){
      message = { cmd: cmd, text:param}
    }else{
      message = { cmd: cmd}
    }
    this.serverMessages.push(message);
    this.socket$.next(message);
    // this.clientMessage = '';
     
  }

  disconnect(){
    const message:IChatGeneric<any> = { cmd: 'disconnect', cmdKey:this.nickName} 
    this.socket$.next(message);
    this.clear();
  }

public isMine(message: any): boolean {
    return message && message === this.sender;
 }
  private scroll(): void {
    setTimeout(() => {
        this.scrollToBottom();
    }, 100);
}
private getDiff(): number {
  if (!this.viewer) {
      return -1;
  }
  const nativeElement = this.viewer.nativeElement;
  return nativeElement.scrollHeight - (nativeElement.scrollTop + nativeElement.clientHeight);
}
get nickName(){
  return this.getItem(nickName);
}

get channel(){
  return this.getItem(channelKey);
}

private scrollToBottom(t = 1, b = 0): void {
  if (b < 1) {
      b = this.getDiff();
  }
  if (b > 0 && t <= 120) {
      setTimeout(() => {
          const diff = this.easeInOutSin(t / 120) * this.getDiff();
          this.viewer.nativeElement.scrollTop += diff;
          this.scrollToBottom(++t, b);
      }, 1 / 60);
  }
}

private easeInOutSin(t): number {
  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
}

private getItem(key){
  return window.localStorage.getItem(key);
}

private setItem(key, data){
  window.localStorage.setItem(key,data);
}
private clear(){
  this.showForm = true;
  window.localStorage.removeItem(channelKey);
  window.localStorage.removeItem(nickName);
  window.localStorage.clear();
}
sendMsg() {
//  this.chatService.send(this.message);
 // console.log("new message from client to websocket: ", this.message);
 // this.chatService.messages.next(this.message);
  // this.message.text = "";
  }




  other(){
    this.chatService.makeConnection();
    let ws = this.chatService.ws;
    ws.onopen=() =>{
        this.chatService.send({ cmd: 'join', channel: 'programming', nick: 'sunkanmi' });
    }
   // this.sendMsg();
   console.log(this.chatService.getMessage());
  }

}
