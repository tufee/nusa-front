import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Recipe } from 'src/app/models/recipe';

const mockRecipeData: Recipe[] = [
  { medico: 'Carlos', paciente: 'Maria', medicamento: 'dipirona', data_prescricao: new Date() },
  { medico: 'Sergio', paciente: 'Sheila', medicamento: 'dipirona', data_prescricao: new Date() },
  { medico: 'Paulo', paciente: 'Carla', medicamento: 'dipirona', data_prescricao: new Date() },
  { medico: 'Antonio', paciente: 'Bia', medicamento: 'dipirona', data_prescricao: new Date() },
  { medico: 'Marcos', paciente: 'Joana', medicamento: 'dipirona', data_prescricao: new Date() },
];

@Component({
  selector: 'app-recipe-table',
  styleUrls: ['./recipe-table.component.css'],
  templateUrl: './recipe-table.component.html',
  standalone: true,
  imports: [MatTableModule, DatePipe],
})

export class RecipeTableComponent {
  // @Input() recipeData: Recipe[];

  // constructor() {
  //   this.recipeData = [];
  // }

  displayedColumns: string[] = ['medico', 'paciente', 'medicamento', 'data_prescricao'];
  dataSource = mockRecipeData;
}

