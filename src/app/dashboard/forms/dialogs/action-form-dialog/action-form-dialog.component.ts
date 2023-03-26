import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormFieldValues } from 'src/app/shared/interfaces/auth.interface';
import { IDialogForm } from 'src/app/shared/interfaces/dialogs.interface';

@Component({
  selector: 'app-action-form-dialog',
  templateUrl: './action-form-dialog.component.html',
  styleUrls: ['./action-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionFormDialogComponent {
  public formsData: FormGroup = new FormGroup({
    idForm: new FormControl(this.dialogForm.idForm),
    id: new FormControl(this.dialogForm.formFieldId[0].form_field_id,),
    value: new FormControl(this.dialogForm.formFieldId[0].value),
    valueForChange: new FormControl('', [Validators.required,
    Validators.minLength(1), Validators.maxLength(20)]),
  });

  constructor(
    private dialogRef: MatDialogRef<ActionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogForm: IDialogForm,) { }

  public setData(): void {
    this.dialogRef.close(this.formsData.value);
  }

  public checkData(value: string): void {
    const formFieldId = this.dialogForm.formFieldId;
    const currentFieldValue = this.formsData.value.value;
    const currentFieldId = this.formsData.value.id;

    const matchingField = formFieldId.find((el: IFormFieldValues) => {
      return (value === 'id' && el.form_field_id === currentFieldId) || (value === 'value' && el.value === currentFieldValue);
    });

    if (matchingField) {
      const updateValue = (value === 'id') ? { value: matchingField.value } : { id: matchingField.form_field_id };
      this.formsData.patchValue(updateValue);
    }
  }
}