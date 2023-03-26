import { IFormFieldValues } from './auth.interface';

export interface IConfirmDialog {
  isConfirm: boolean,
  idForms: number,
}
export interface IDialogForm {
  idForm: number,
  formFieldId: IFormFieldValues[],
  title: string,
  action: string,
}

export interface IOptionsDialogData {
  id: number;
  idForm: number;
  value: string;
  valueForChange: string;
}