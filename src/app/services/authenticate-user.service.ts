import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import * as jose from 'jose';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Login } from '../models/login';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {

  private readonly API = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(login: Login): Observable<any> {
    return this.httpClient.post<Login>(`${this.API}/login`, login);
  }

  verifyLogin(): boolean | UrlTree {
    if (!this.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? token : null;
  }


  getUserId(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken: any = jose.decodeJwt(token);
      return decodedToken.userId;
    }

    return null;
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token.toString());
  }
}
