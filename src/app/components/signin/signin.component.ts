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
import { CpfFormatDirective } from 'src/app/shared/directives/cpf-format.directive';
import { FormUtilsService } from 'src/app/shared/forms/form-utils.service';
import Swal from 'sweetalert2';

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
    NgIf,
    CpfFormatDirective
  ],
})

export class SigninComponent {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthenticateUserService,
    private router: Router,
    public formUtils: FormUtilsService,
    public cpfFormat: CpfFormatDirective,

  ) {
    this.form = this.formBuilder.group({
      cpf: ['', [
        Validators.required,
        this.cpfFormat.cpfValidator]
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
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: "Verifique usuário e/ou senha.",
          })
        }
      }));
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }
}
