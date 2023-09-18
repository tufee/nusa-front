import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  saveRecipe(recipe: Recipe) {
    return this.httpClient.post<Recipe>(`${this.API}/create/receita`, recipe);
  }

  getAllMedicine() {
    return this.httpClient.get<Recipe[]>(`${this.API}/receita`);
  }
}
