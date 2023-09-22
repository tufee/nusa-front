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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';
import { PatientTableComponent } from 'src/app/shared/components/patient-table/patient-table.component';
import { CpfFormatDirective } from 'src/app/shared/directives/cpf-format.directive';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';
import Swal from 'sweetalert2';

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
    MatNativeDateModule,
    MatIconModule,
    CpfFormatDirective
  ],
})

export class PatientComponent {
  form: FormGroup;
  searchForm: FormGroup;
  patient: Patient[] = []

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    public formUtils: FormUtilsService,
    public cpfFormat: CpfFormatDirective,
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [
        Validators.required,
        this.cpfFormat.cpfValidator
      ]],
      data_nascimento: ['', Validators.required],
    });

    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value: string) => this.service.getPatients(value)),
    )
      .subscribe(({
        next: (value) => {
          this.patient = value;
        },
      }))

    this.service.getAllPatient().subscribe(({
      next: (value) => {
        this.patient = value;
      },
    }))
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.savePatient(this.form.value).subscribe(({
        error: (err) => {
          if (err.error === 'Paciente já cadastrado') {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'CPF já cadastrado',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Erro ao cadastrar paciente, verifique os dados enviados',
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
