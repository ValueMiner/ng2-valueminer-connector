import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  private socket: any;
  public oauth: any;

  constructor(private token: TokenService) {}

  public connectToInstanceRoom(environment: any, instanceId: number, room: string, event: any) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'instance_' + instanceId + '_' + room);

      this.socket.on('businessarea.create', (o: any) => event.emit(o));
      this.socket.on('businessarea.update', (o: any) => event.emit(o));
      this.socket.on('businessarea.delete', (o: any) => event.emit(o));

      this.socket.on('humanresource.create', (o: any) => event.emit(o));
      this.socket.on('humanresource.update', (o: any) => event.emit(o));
      this.socket.on('humanresource.delete', (o: any) => event.emit(o));

      this.socket.on('activities.create', (o: any) => event.emit(o));
      this.socket.on('activities.update', (o: any) => event.emit(o));
      this.socket.on('activities.delete', (o: any) => event.emit(o));

    });
  }

  public connectToBusinessareaRoom(environment: any, businessareaId: number, room: string, event: any) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'instance_' + businessareaId + '_' + room);

      this.socket.on('model.create', (o: any) => event.emit(o));
      this.socket.on('model.update', (o: any) => event.emit(o));
      this.socket.on('model.delete', (o: any) => event.emit(o));

      this.socket.on('importscheme.create', (o: any) => event.emit(o));
      this.socket.on('importscheme.update', (o: any) => event.emit(o));
      this.socket.on('importscheme.delete', (o: any) => event.emit(o));

      this.socket.on('activities.create', (o: any) => event.emit(o));
      this.socket.on('activities.update', (o: any) => event.emit(o));
      this.socket.on('activities.delete', (o: any) => event.emit(o));


      this.socket.on('node.data.update', (o: any) => event.emit(o));
      this.socket.on('node.data.create', (o: any) => event.emit(o));
      this.socket.on('node.data.delete', (o: any) => event.emit(o));

    });
  }

  public connectToModelRoom(environment: any, modelId: number, room: string, event: any) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'instance_' + modelId + '_' + room);

      this.socket.on('model.create', (o: any) => event.emit(o));
      this.socket.on('model.update', (o: any) => event.emit(o));
      this.socket.on('model.delete', (o: any) => event.emit(o));

      this.socket.on('subset.create', (o: any) => event.emit(o));
      this.socket.on('subset.update', (o: any) => event.emit(o));
      this.socket.on('subset.delete', (o: any) => event.emit(o));

      this.socket.on('node.structure.update', (o: any) => event.emit(o));
      this.socket.on('node.structure.create', (o: any) => event.emit(o));
      this.socket.on('node.structure.delete', (o: any) => event.emit(o));

      this.socket.on('relationship.update', (o: any) => event.emit(o));
      this.socket.on('relationship.create', (o: any) => event.emit(o));
      this.socket.on('relationship.delete', (o: any) => event.emit(o));

    });
  }

  private establishSocket(environment: any, callback: Function) {
    if (!!this.socket) {
      this.token.get().take(1).subscribe((accessToken: string) => {
        this.socket = io(environment.messagingUrl + this.getterize({ 'token': accessToken }), { path: environment.messagingSocketPath });
        /* Global Event Listeners */
        this.socket.on('disconnect', () => {});
        this.socket.on('connect_failed', () => {});
        this.socket.on('connect_error', () => {});
        this.socket.on('reconnect', () => {});
        this.socket.on('connected', () => {});
        this.socket.on('oauth', (o: any) => this.oauth = o);
        callback.call(this);
      });
    } else {
      callback.call(this);
    }
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
