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
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';

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
    MatSelectModule
  ]
})

export class SignupComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private snackbar: SnackbarService,
    private router: Router,
    public formUtils: FormUtilsService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]],
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
        error: (err) => {
          this.snackbar.error(err.error);
        },
        complete: () => {
          this.snackbar.success('Cadastro realizado com sucesso');
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
