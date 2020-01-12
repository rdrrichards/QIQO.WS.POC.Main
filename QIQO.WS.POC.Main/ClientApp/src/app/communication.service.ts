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
        // skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start()
      // .then(_ => console.log('this.hubConnection.connectionId: ', this.hubConnection.connectionId))
      .catch(err => console.log(err));
    // this.hubConnection.on('joined', (userName: string) => {
    //   console.log(`${userName} joined the group`);
    //   console.log('this.hubConnection.connectionId: ', this.hubConnection.connectionId);
    // });
    this.hubConnection.on('joinedviewer', (userName: string) => {
      console.log(`${userName} joinedviewer the group`);
      console.log('this.hubConnection.connectionId: ', this.hubConnection.connectionId);
    });
    this.hubConnection.on('joinedmain', (userName: string) => {
      console.log(`${userName} joinedmain the group`);
      console.log('this.hubConnection.connectionId: ', this.hubConnection.connectionId);
    });
  }
  join() {
    setTimeout(() => {
      this.hubConnection.invoke('joinmain', 'rrichards (main)');
    }, 3000);
  }
  view(uri: string) {
    this.hubConnection.invoke('view', this.hubConnection.connectionId, uri);
  }
}
