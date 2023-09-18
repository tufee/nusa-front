import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private readonly API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  saveMedicine(medicine: Medicine) {
    return this.httpClient.post<Medicine>(`${this.API}/create/medicamento`, medicine);
  }

  getAllMedicine() {
    return this.httpClient.get<Medicine[]>(`${this.API}/medicamento`);
  }
}
