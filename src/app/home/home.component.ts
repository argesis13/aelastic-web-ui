import {Component} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'home-header',
  providers: [AppService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private service: AppService) {}

  onInit() {
    this.service.checkCredentials();
  }

  logout() {
    this.service.logout();
  }

}
