import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar) {
  }

  error(message: string) {
    return this.snackBar.open(message, '',
      {
        panelClass: ['snackbar-error'],
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }

  success(message: string) {
    return this.snackBar.open(message, '',
      {
        panelClass: ['snackbar-success'],
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }

  info(message: string) {
    return this.snackBar.open(message, '',
      {
        panelClass: ['snackbar-info'],
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }
}
