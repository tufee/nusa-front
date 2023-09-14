import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

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

export class SignupComponent implements OnInit {
  selectedUser = 'paciente';

  form: FormGroup;
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private snackbar: SnackbarService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      data_nascimento: ['', Validators.required],
      tipo: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirma_senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO
    // alterer cor do popup de erro e sucesso
    console.log(this.form.value);
    this.service.savePaciente(this.form.value).subscribe(({
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
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 6;
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
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
