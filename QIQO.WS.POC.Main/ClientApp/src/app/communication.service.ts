import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  hubConnection: signalR.HubConnection;
  constructor() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Error)
      .withUrl(`${environment.baseHubUrl}comms`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start().catch(err => console.log(err));
    this.hubConnection.on('joined', (userName: string) => {
      console.log(`${userName} joined the group`, userName);
    });
  }
  join() {
    this.hubConnection.invoke('join', 'rrichards (viewer)');
  }
  view(uri: string) {
    this.hubConnection.invoke('view', uri);
  }
}
