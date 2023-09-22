import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Medicine } from 'src/app/models/medicine';
import { Patient } from 'src/app/models/patient';
import { RecipePayLoad } from 'src/app/models/recipe';
import { AuthenticateUserService } from 'src/app/services/authenticate-user.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { RecipeTableComponent } from 'src/app/shared/components/recipe-table/recipe-table.component';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';
import Swal from 'sweetalert2';

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
    NgFor,
    MatSelectModule,
    RecipeTableComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
})

export class RecipeComponent {
  form: FormGroup;
  patients: Patient[] = []
  medicines: Medicine[] = []
  recipes: RecipePayLoad[] = []
  userContext: string | null = null

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private recipeService: RecipeService,
    private medicineService: MedicineService,
    private authService: AuthenticateUserService,
    private service: UserService,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      paciente: ['', [Validators.required]],
      medicamento: ['', [Validators.required]],
      data_prescricao: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.form.get('paciente')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: string) => this.service.getPatients(value)),
    )
      .subscribe(({
        next: (value) => {
          this.patients = value;
        },
      }))

    this.form.get('medicamento')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: string) => this.medicineService.getMedicines(value)),
    )
      .subscribe(({
        next: (value) => {
          this.medicines = value;
        },
      }))

    this.recipeService.getAllRecipes().subscribe(({
      next: (value) => {
        this.recipes = value
      },
    }))

    const userId = this.authService.getUserId()
    this.userContext = userId ? userId : null
  }

  getOptionText(data: { nome: string }) {
    return data.nome;
  }

  onSubmit() {
    if (this.form.valid) {
      const userId = this.userContext
      this.recipeService.saveRecipe({ ...this.form.value, userId }).subscribe(({
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao cadastrar receita',
          })
        },
        complete: () => {
          Swal.fire(
            'Sucesso!',
            'Receita cadastrada com sucesso',
            'success'
          )
        },
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
