import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { RecipeTableComponent } from 'src/app/shared/components/recipe-table/recipe-table.component';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';

@Component({
  selector: 'app-recipe',
  styleUrls: ['./recipe.component.css'],
  templateUrl: './recipe.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    RecipeTableComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})

export class RecipeComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private recipeService: RecipeService,
    private snackbar: SnackbarService,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      paciente_id: ['', [Validators.required]],
      medicamento_id: ['', [Validators.required]],
      data_prescricao: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.recipeService.saveRecipe(this.form.value).subscribe(({
        error: (err) => {
          console.log(err)
          this.snackbar.error(err.error);
        },
        complete: () => {
          this.snackbar.success('Receita Cadastrada com sucesso');
        },
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
