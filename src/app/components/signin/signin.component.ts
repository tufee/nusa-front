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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthenticateUserService } from 'src/app/services/authenticate-user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';

@Component({
  selector: 'app-signin',
  styleUrls: ['./signin.component.css'],
  templateUrl: './signin.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    NgIf
  ],
})

export class SigninComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthenticateUserService,
    private snackbar: SnackbarService,
    private router: Router,
    public formUtils: FormUtilsService,

  ) {
    this.form = this.formBuilder.group({
      cpf: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)]
      ],
      senha: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(({
        next: (value) => {
          this.authService.saveToken(value.token);
          this.router.navigate(['/home']);
        },
        complete: () => {
          this.snackbar.success('Login realizado com sucesso');
        },
        error: (err) => {
          this.snackbar.error(err.error);
        }
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
