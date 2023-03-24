import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const ErrorSnackbarOptions: MatSnackBarConfig = {
  duration: 5000,
  panelClass: ['error-snackbar'],
  horizontalPosition: 'right',
  verticalPosition: 'top',
};