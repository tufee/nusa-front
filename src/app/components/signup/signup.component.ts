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
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CpfFormatDirective } from 'src/app/shared/directives/cpf-format.directive';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    CpfFormatDirective
  ]
})

export class SignupComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private router: Router,
    public formUtils: FormUtilsService,
    public cpfFormat: CpfFormatDirective,
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [
        Validators.required,
        this.cpfFormat.cpfValidator]
      ],
      data_nascimento: ['', Validators.required],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirma_senha: ['', [
        Validators.required,
        Validators.minLength(6)]
      ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.saveDoctor(this.form.value).subscribe(({
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao cadastrar médico, verifique os dados enviados',
          })
        },
        complete: () => {
          Swal.fire(
            'Sucesso!',
            'Cadastro realizado com sucesso',
            'success'
          )
        },
        next: () => {
          this.router.navigate(['/home']);
        },
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
