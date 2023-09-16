import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

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
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private snackbar: SnackbarService
  ) {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO
    // alterer cor do popup de erro e sucesso
    console.log(this.form.value);
    this.service.login(this.form.value).subscribe(({
      error: () => {
        // TODO
        // adicionar erros de validação que vem do backend
        this.snackbar.error('Erro ao Cadastrar');
      },
      complete: () => {
        this.snackbar.success('Cadastrado com sucesso');
      },
    }));
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 11;
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 11;
      return `Campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido'
  }
}
