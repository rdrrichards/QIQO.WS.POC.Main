import { Component } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private commsService: CommunicationService) {}
  goOne() {
    this.commsService.view('assets/one.html');
  }
  goTwo() {
    this.commsService.view('assets/two.html');
  }
  goTre() {
    this.commsService.view('assets/tre.html');
  }
  goFour() {
    this.commsService.view('assets/four.html');
  }
  join() {
    this.commsService.join();
  }
}
