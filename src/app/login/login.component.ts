import { Component } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'login-form',
  providers: [AppService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginData = {
    username: '',
    password: ''
  };

  constructor(private service: AppService) {

  }

  login() {
    this.service.obtainAccessToken(this.loginData);
  }

}
