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
import { Patient } from 'src/app/models/patient';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { PatientTableComponent } from 'src/app/shared/components/patient-table/patient-table.component';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';

@Component({
  selector: 'app-patient',
  styleUrls: ['./patient.component.css'],
  templateUrl: './patient.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    PatientTableComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})

export class PatientComponent {
  form: FormGroup;
  patient: Patient[] = []

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private snackbar: SnackbarService,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)]
      ],
      data_nascimento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.service.getAllPatient().subscribe(({
      next: (value) => {
        this.patient = value
      },
      error: (err) => {
        console.log(err);
      },
    }));
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.savePatient(this.form.value).subscribe(({
        error: (err) => {
          this.snackbar.error(err.error);
        },
        complete: () => {
          this.snackbar.success('Paciente Cadastrado com sucesso');
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
