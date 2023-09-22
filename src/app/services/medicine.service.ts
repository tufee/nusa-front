import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private readonly API = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  saveMedicine(medicine: Medicine) {
    return this.httpClient.post<Medicine>(`${this.API}/create/medicamento`, medicine);
  }

  getAllMedicine() {
    return this.httpClient.get<Medicine[]>(`${this.API}/medicamento`);
  }

  getMedicines(name: string) {
    return this.httpClient.get<Medicine[]>(`${this.API}/medicamento/search?name=${name}`);
  }
}
