import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {map} from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService) {}

  obtainAccessToken(loginData) {
    const form = new URLSearchParams();
    form.append('grant_type', 'password');
    form.append('scope', 'webclient');
    form.append('username', loginData.username);
    form.append('password', loginData.password);

    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Basic ' + btoa('aelastic-web-ui:')})
    };

    const observable = this.http.post('https://localhost:8888/oauth/token', form.toString(), httpOptions)
      .pipe(
        map(response => {
          this.saveTokens(response);
          console.log(response);
        })).subscribe();
  }

  saveTokens(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set('access_token', token.access_token, expireDate);
    this.cookieService.set('refresh_token', token.refresh_token);
    console.log('Obtained Access token');
    this.router.navigate(['/home']);
  }

  checkCredentials() {
    if (!this.cookieService.get('access_token')) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.router.navigate(['/']);
  }

}
