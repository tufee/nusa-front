import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  savePatient(user: Patient) {
    return this.httpClient.post<Patient>(`${this.API}/create/paciente`, user);
  }

  getAllPatient() {
    return this.httpClient.get<Patient[]>(`${this.API}/paciente`);
  }

  saveDoctor(doctor: Doctor) {
    return this.httpClient.post<Doctor>(`${this.API}/create/medico`, doctor);
  }

  getPatients(name: string) {
    return this.httpClient.get<Patient[]>(`${this.API}/paciente/search?name=${name}`);
  }
}

