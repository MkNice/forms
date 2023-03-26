import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialog, IDialogForm } from '../../interfaces/dialogs.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  public dataDialog: IConfirmDialog = {
    isConfirm: false,
    idForms: this.dialogForm.idForm,
  };

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogForm: IDialogForm
  ) { }

  public isApprove(): void {
    this.dataDialog.isConfirm = true;
    this.dialogRef.close(this.dataDialog);
  }
}
