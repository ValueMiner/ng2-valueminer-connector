import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  private socket: any;
  public oauth: any;

  constructor(private token: TokenService) {}

  public connectToInstanceRoom(environment: any, instanceId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'instance_' + instanceId + '_' + room);

      this.socket.on('businessarea.create', callback);
      this.socket.on('businessarea.update', callback);
      this.socket.on('businessarea.delete', callback);

      this.socket.on('humanresource.create', callback);
      this.socket.on('humanresource.update', callback);
      this.socket.on('humanresource.delete', callback);

      this.socket.on('activities.create', callback);
      this.socket.on('activities.update', callback);
      this.socket.on('activities.delete', callback);

    });
  }

  public disconnectFromInstanceRoom(environment: any, instanceId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'instance_' + instanceId + '_' + room);

      this.socket.removeListener('businessarea.create', callback);
      this.socket.removeListener('businessarea.update', callback);
      this.socket.removeListener('businessarea.delete', callback);

      this.socket.removeListener('humanresource.create', callback);
      this.socket.removeListener('humanresource.update', callback);
      this.socket.removeListener('humanresource.delete', callback);

      this.socket.removeListener('activities.create', callback);
      this.socket.removeListener('activities.update', callback);
      this.socket.removeListener('activities.delete', callback);

    });
  }

  public connectToBusinessareaRoom(environment: any, businessareaId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'businessarea_' + businessareaId + '_' + room);

      this.socket.on('model.create', callback);
      this.socket.on('model.update', callback);
      this.socket.on('model.delete', callback);

      this.socket.on('importscheme.create', callback);
      this.socket.on('importscheme.update', callback);
      this.socket.on('importscheme.delete', callback);

      this.socket.on('activities.create', callback);
      this.socket.on('activities.update', callback);
      this.socket.on('activities.delete', callback);

      this.socket.on('node.data.update', callback);
      this.socket.on('node.data.create', callback);
      this.socket.on('node.data.delete', callback);

    });
  }

  public disconnectFromBusinessareaRoom(environment: any, businessareaId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'businessarea_' + businessareaId + '_' + room);

      this.socket.removeListener('model.create', callback);
      this.socket.removeListener('model.update', callback);
      this.socket.removeListener('model.delete', callback);

      this.socket.removeListener('importscheme.create', callback);
      this.socket.removeListener('importscheme.update', callback);
      this.socket.removeListener('importscheme.delete', callback);

      this.socket.removeListener('activities.create', callback);
      this.socket.removeListener('activities.update', callback);
      this.socket.removeListener('activities.delete', callback);

      this.socket.removeListener('node.data.update', callback);
      this.socket.removeListener('node.data.create', callback);
      this.socket.removeListener('node.data.delete', callback);

    });
  }

  public connectToModelRoom(environment: any, modelId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'model_' + modelId + '_' + room);

      this.socket.on('model.create', callback);
      this.socket.on('model.update', callback);
      this.socket.on('model.delete', callback);

      this.socket.on('subset.create', callback);
      this.socket.on('subset.update', callback);
      this.socket.on('subset.delete', callback);

      this.socket.on('node.structure.update', callback);
      this.socket.on('node.structure.create', callback);
      this.socket.on('node.structure.delete', callback);

      this.socket.on('relationship.update', callback);
      this.socket.on('relationship.create', callback);
      this.socket.on('relationship.delete', callback);

    });
  }

  public disconnectFromModelRoom(environment: any, modelId: number, room: string, callback: Function) {
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'model_' + modelId + '_' + room);

      this.socket.removeListener('model.create', callback);
      this.socket.removeListener('model.update', callback);
      this.socket.removeListener('model.delete', callback);

      this.socket.removeListener('subset.create', callback);
      this.socket.removeListener('subset.update', callback);
      this.socket.removeListener('subset.delete', callback);

      this.socket.removeListener('node.structure.update', callback);
      this.socket.removeListener('node.structure.create', callback);
      this.socket.removeListener('node.structure.delete', callback);

      this.socket.removeListener('relationship.update', callback);
      this.socket.removeListener('relationship.create', callback);
      this.socket.removeListener('relationship.delete', callback);

    });
  }

  private establishSocket(environment: any, callback: Function) {
    if (!!this.socket) {
      callback.call(this);
    } else {
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
