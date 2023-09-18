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
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MedicineTableComponent } from 'src/app/shared/components/medicine-table/medicine-table.component';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';

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
  medicine: Medicine[] = []

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: MedicineService,
    private snackbar: SnackbarService,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      codigo_anvisa: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.service.getAllMedicine().subscribe(({
      next: (value) => {
        this.medicine = value
      },
      error: (err) => {
        console.log(err);
      },
    }));
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.saveMedicine(this.form.value).subscribe(({
        error: (err) => {
          this.snackbar.error(err.error);
        },
        complete: () => {
          this.snackbar.success('Medicamento Cadastrado com sucesso');
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
