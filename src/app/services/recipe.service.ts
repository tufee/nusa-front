import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipePayLoad, RecipeRequest } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  saveRecipe(recipe: RecipeRequest) {
    const medico_id = recipe.userId
    const paciente_id = recipe.paciente.id
    const medicamento_id = recipe.medicamento.id
    const data_prescricao = recipe.data_prescricao

    const payload = {
      medico_id,
      paciente_id,
      medicamento_id,
      data_prescricao
    }

    return this.httpClient.post<Recipe>(`${this.API}/create/receita`, payload);
  }

  getAllRecipes() {
    return this.httpClient.get<RecipePayLoad[]>(`${this.API}/receita`);
  }
}
