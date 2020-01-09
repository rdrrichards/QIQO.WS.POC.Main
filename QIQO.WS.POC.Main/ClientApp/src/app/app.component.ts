import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private commsService: CommunicationService) {}
  ngOnInit() {
    setTimeout(() => {
      this.commsService.join();
    }, 2000);
  }
}
