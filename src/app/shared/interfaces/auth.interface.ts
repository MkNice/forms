export interface IAuthFieldsData {
  email: string,
  password: string,
}

export interface IForms {
  data: IFormsData[];
  meta: IFormsMeta;
}

export interface IFormsData {
  id: number,
  user_id: number,
  type: string,
  created_at: string,
  updated_at: string,
  form_field_values: IFormFieldValues[];
}

export interface IFormsMeta {
  order_by: string;
  order_direction: string;
  page: string;
  pages_count: number;
  per_page: string;
  total_items_count: number;
}

export type IFormFieldValues = Pick<IFormsData, 'id' | 'type' | 'created_at' | 'updated_at'> & {
  form_id: number,
  form_field_id: number,
  value: string,
};

export type bodyForms = { form_field_values: Pick<IFormFieldValues, 'form_field_id' | 'value'>[]; }

export interface IParams {
  pageSize: number,
  maxSizePages: number[],
  length: number,
  pageIndex: number,
  search: string,
  filterByOrder: string,
  filterByData: string,
}

export interface IUser {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  is_active: boolean;
  is_admin: boolean | null;
  name: string;
  type: string;
  updated_at: string;
};

export interface IUserData {
  access_token: string;
  expires_in: number;
  refresh_in: number;
  token_type: string;
  user: IUser;
}