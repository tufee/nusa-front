import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RecipePayLoad } from 'src/app/models/recipe';

@Component({
  selector: 'app-recipe-table',
  styleUrls: ['./recipe-table.component.css'],
  templateUrl: './recipe-table.component.html',
  standalone: true,
  imports: [MatTableModule, DatePipe],
})

export class RecipeTableComponent {
  @Input() recipeData: RecipePayLoad[];

  constructor() {
    this.recipeData = [];
  }

  displayedColumns: string[] = ['nome_medico', 'nome_paciente', 'nome_medicamento', 'data_prescricao'];
}

