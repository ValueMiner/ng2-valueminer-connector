import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  private domain:string = "http://messaging.valueminer.dev";
  private path:string = "/socket.io";
  private socket:any;
  public eventLetsee:Observable<string> = new Observable<string>();
  public test: string;

  constructor(private token: TokenService){
  }

  public connectModelToRoom(modelId:number, room: string, event: any){
    console.log("connect function called");
    this.token.get().subscribe((accessToken: string) => {
      console.log(accessToken);
      let options = {
        //"instance":2,
        "token":accessToken
      }
      this.socket = io(this.domain + this.getterize(options), { path: this.path });
      this.socket.emit('enter','model_'+modelId+'_'+room);
      this.socket.on('disconnect', function() {
        console.log("disconnect");
      });
      this.socket.on('connect_failed', function() {
        console.log("connect_failed");
      });
      this.socket.on('connect_error', function() {
        console.log("connect_error");
      });
      this.socket.on('reconnect', function() {
        console.log("reconnect");
      });
      this.socket.on('connected', function() {
        console.log("connected");
      });
      this.socket.on('oauth', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.node.create', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.node.update.position', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.node.update', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.relationship.create', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.relationship.update', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.relationship.delete', function(o: any) {
        console.log(o);
      });
      this.socket.on('arns.relationship.reconnect', function(o: any) {
        console.log(o);
      });
      this.socket.on('activity.create', function(o: any) {
        console.log(o);
      });
      this.socket.on('activity.update', function(o: any) {
        console.log(o);
      });
      this.socket.on('activity.delete', function(o: any) {
        console.log(o);
      });
      this.socket.on('joined', function(o: any) {
        console.log(o);
      });
      this.socket.on('node.structure.update', function(o: any) {
        // wrap the object
        event.emit(o);
        //console.log(o);
        //this.eventLetsee = new EventEmitter();

        //console.log(o.element.data.id);
        //console.log(o.element.data.positionX);
        //var node = document.getElementById('node-'+o.element.data.id);
        //node.setAttribute("transform", "translate("+o.element.data.positionX+",50)");
      });
    });
  }

  private getterize(obj:any):string {
    let str:string = '';
		for (var prop in obj) {
			if(typeof obj[prop] !== 'function' && typeof obj[prop] !== 'object') {
				str += (str === '' ? '?' : '&') + prop + '=' + obj[prop];
			}
		}
		return str;
  }
}
