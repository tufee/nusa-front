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
import { distinctUntilChanged, switchMap } from 'rxjs';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { MedicineTableComponent } from 'src/app/shared/components/medicine-table/medicine-table.component';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine',
  styleUrls: ['./medicine.component.css'],
  templateUrl: './medicine.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    MedicineTableComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})

export class MedicineComponent {
  form: FormGroup;
  searchForm: FormGroup;
  medicine: Medicine[] = []

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: MedicineService,
    public formUtils: FormUtilsService,
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      codigo_anvisa: ['', [Validators.required]],
    });

    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm.get('search')?.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((value: string) => this.service.getMedicines(value)),
    )
      .subscribe(({
        next: (value) => {
          this.medicine = value
        },
      }));
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.saveMedicine(this.form.value).subscribe(({
        error: (err) => {
          if (err.error === 'medicamento já cadastrado') {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Medicamento já cadastrado',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Erro ao cadastrar medicamento, verifique os dados enviados',
            })
          }
        },
        complete: () => {
          Swal.fire(
            'Sucesso!',
            'Cadastro realizado com sucesso',
            'success'
          )
        },
        next: () => {
          this.ngOnInit()
        }
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
