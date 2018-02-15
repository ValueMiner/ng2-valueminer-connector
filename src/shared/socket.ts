import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import * as io from 'socket.io-client';

@Injectable()
export class Socket {

  public oauth: any;
  private socket: any;
  private reconnect = false;

  private lastConnection = <any> {
    instance: undefined,
    businessarea: undefined,
    model: undefined
  };

  constructor(private token: TokenService) {}

  public connectToInstanceRoom(environment: any, instanceId: number, room: string, event: any) {
    this.lastConnection.instance = arguments;
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

  public disconnectFromInstanceRoom(environment: any, instanceId: number, room: string, event: any) {
    this.lastConnection.instance = undefined;
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'instance_' + instanceId + '_' + room);

      this.socket.removeListener('businessarea.create', (o: any) => event.emit(o));
      this.socket.removeListener('businessarea.update', (o: any) => event.emit(o));
      this.socket.removeListener('businessarea.delete', (o: any) => event.emit(o));

      this.socket.removeListener('humanresource.create', (o: any) => event.emit(o));
      this.socket.removeListener('humanresource.update', (o: any) => event.emit(o));
      this.socket.removeListener('humanresource.delete', (o: any) => event.emit(o));

      this.socket.removeListener('activities.create', (o: any) => event.emit(o));
      this.socket.removeListener('activities.update', (o: any) => event.emit(o));
      this.socket.removeListener('activities.delete', (o: any) => event.emit(o));

    });
  }

  public connectToBusinessareaRoom(environment: any, businessareaId: number, room: string, event: any) {
    this.lastConnection.businessarea = arguments;
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'businessarea_' + businessareaId + '_' + room);

      this.socket.on('businessarea.create', (o: any) => event.emit(o));
      this.socket.on('businessarea.update', (o: any) => event.emit(o));
      this.socket.on('businessarea.delete', (o: any) => event.emit(o));

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

  public disconnectFromBusinessareaRoom(environment: any, businessareaId: number, room: string, event: any) {
    this.lastConnection.businessarea = undefined;
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'businessarea_' + businessareaId + '_' + room);

      this.socket.removeListener('businessarea.create', (o: any) => event.emit(o));
      this.socket.removeListener('businessarea.update', (o: any) => event.emit(o));
      this.socket.removeListener('businessarea.delete', (o: any) => event.emit(o));

      this.socket.removeListener('model.create', (o: any) => event.emit(o));
      this.socket.removeListener('model.update', (o: any) => event.emit(o));
      this.socket.removeListener('model.delete', (o: any) => event.emit(o));

      this.socket.removeListener('importscheme.create', (o: any) => event.emit(o));
      this.socket.removeListener('importscheme.update', (o: any) => event.emit(o));
      this.socket.removeListener('importscheme.delete', (o: any) => event.emit(o));

      this.socket.removeListener('activities.create', (o: any) => event.emit(o));
      this.socket.removeListener('activities.update', (o: any) => event.emit(o));
      this.socket.removeListener('activities.delete', (o: any) => event.emit(o));

      this.socket.removeListener('node.data.update', (o: any) => event.emit(o));
      this.socket.removeListener('node.data.create', (o: any) => event.emit(o));
      this.socket.removeListener('node.data.delete', (o: any) => event.emit(o));

    });
  }

  public connectToModelRoom(environment: any, modelId: number, room: string, event: any) {
    this.lastConnection.model = arguments;
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'model_' + modelId + '_' + room);

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

  public disconnectFromModelRoom(environment: any, modelId: number, room: string, event: any) {
    this.lastConnection.model = undefined;
    this.establishSocket(environment, () => {
      this.socket.emit('leave', 'model_' + modelId + '_' + room);

      this.socket.removeListener('model.create', (o: any) => event.emit(o));
      this.socket.removeListener('model.update', (o: any) => event.emit(o));
      this.socket.removeListener('model.delete', (o: any) => event.emit(o));

      this.socket.removeListener('subset.create', (o: any) => event.emit(o));
      this.socket.removeListener('subset.update', (o: any) => event.emit(o));
      this.socket.removeListener('subset.delete', (o: any) => event.emit(o));

      this.socket.removeListener('node.structure.update', (o: any) => event.emit(o));
      this.socket.removeListener('node.structure.create', (o: any) => event.emit(o));
      this.socket.removeListener('node.structure.delete', (o: any) => event.emit(o));

      this.socket.removeListener('relationship.update', (o: any) => event.emit(o));
      this.socket.removeListener('relationship.create', (o: any) => event.emit(o));
      this.socket.removeListener('relationship.delete', (o: any) => event.emit(o));

    });
  }

  public connectToNotificationRoom(environment: any, userId: number, room: string, event: any) {
    this.lastConnection.instance = arguments;
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'user_' + userId + '_' + room);

      this.socket.on('aggregation.node.data.update', (o: any) => event.emit(o));

    });
  }

  public disconnectFromNotificationRoom(environment: any, userId: number, room: string, event: any) {
    this.lastConnection.instance = arguments;
    this.establishSocket(environment, () => {
      this.socket.emit('enter', 'user_' + userId + '_' + room);

      this.socket.removeListener('aggregation.node.data.update', (o: any) => event.emit(o));
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
        this.socket.on('reconnect', () => { this.reconnect = true; });
        this.socket.on('connected', () => {
          if (this.reconnect) {
            if (!!this.lastConnection.instance) {
              this.connectToInstanceRoom.apply(this, this.lastConnection.instance);
            }
            if (!!this.lastConnection.businessarea) {
              this.connectToBusinessareaRoom.apply(this, this.lastConnection.businessarea);
            }
            if (!!this.lastConnection.model) {
              this.connectToModelRoom.apply(this, this.lastConnection.model);
            }
            this.reconnect = false;
          }
        });
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
