import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  private socket: any;
  public oauth: any;

  constructor(private token: TokenService) {}

  public connectModelToRoom(environment:any, modelId: number, room: string, event: any) {
    this.token.get().subscribe((accessToken: string) => {
      const options = { 'token': accessToken };
      this.socket = io(environment.messagingUrl + this.getterize(options), { path: environment.messagingSocketPath });
      this.socket.emit('enter', 'model_' + modelId + '_' + room);
      this.socket.on('disconnect', () => {});
      this.socket.on('connect_failed', () => {});
      this.socket.on('connect_error', () => {});
      this.socket.on('reconnect', () => {});
      this.socket.on('connected', () => {});
      this.socket.on('oauth', (o: any) => this.oauth=o);
      this.socket.on('arns.node.create', () => {});
      this.socket.on('arns.node.update.position', () => {});
      this.socket.on('arns.node.update', () => {});
      this.socket.on('arns.relationship.delete', () => {});
      this.socket.on('arns.relationship.reconnect', () => {});
      this.socket.on('activity.create', () => {});
      this.socket.on('activity.update', () => {});
      this.socket.on('activity.delete', () => {});
      this.socket.on('joined', () => {});
      this.socket.on('node.structure.update', (o: any) => event.emit(o));
    });
  }

  private getterize(obj: any): string {
    let str = '';
    for (const prop in obj) {
      if (typeof obj[prop] !== 'function' && typeof obj[prop] !== 'object') {
        str += (str === '' ? '?' : '&') + prop + '=' + obj[prop];
      }
    }
    return str;
  }
}
