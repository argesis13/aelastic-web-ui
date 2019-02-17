import {AppService} from '../app.service';
import {Component} from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dummy-service',
  providers: [AppService],
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})

export class DummyComponent {

  constructor(private service: AppService) {}

  user: User = new User();

  getUser() {
    this.service.getResource()
      .pipe(
      map(
        (resp: User) => {
        this.user.name = resp.name;
      }))
      .subscribe();
  }
}

class User {
  name: 'default';
}
