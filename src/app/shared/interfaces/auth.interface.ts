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

export interface IPaginationData {
  pageSize: number,
  maxSizePages: number[],
  collectionSize: number,
  pageIndex: number,
}