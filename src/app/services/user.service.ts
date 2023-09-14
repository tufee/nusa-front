import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  savePaciente(user: User) {
    if (user.tipo == 'paciente') {
      return this.httpClient.post<User>(`${this.API}/create/paciente`, user);
    }
    return this.httpClient.post<User>(`${this.API}/create/medico`, user);
  }

  login(user: Pick<User, 'cpf' | 'senha'>) {
    return this.httpClient.post<User>(`${this.API}/login`, user);
  }
}
