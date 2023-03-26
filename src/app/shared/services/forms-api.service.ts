import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParams, IForms, bodyForms } from '../interfaces/auth.interface';
import { IOptionsDialogData } from '../interfaces/dialogs.interface';

@Injectable({
  providedIn: 'root'
})
export class FormsAPIService {

  private url = '/forms';

  constructor(private readonly http: HttpClient) { }

  public getForms(params: IParams): Observable<IForms> {
    let httpParams = new HttpParams()
      .set('page', params.pageIndex)
      .set('per_page', params.pageSize);

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.filterByOrder) {
      httpParams = httpParams.set('order_direction', params.filterByOrder);
    }
    if (params.filterByData) {
      httpParams = httpParams.set('created_at,', params.filterByData);
    }

    return this.http.get<IForms>(this.url, { params: httpParams });
  }

  public patchFormValues(params: IOptionsDialogData) {
    const url = `${this.url}/${params.idForm}`;
    const body = this.getBody(params.id, params.valueForChange);

    return this.http.post(url, body);
  }

  public postForm(params: IOptionsDialogData) {
    const body = this.getBody(params.id, params.valueForChange);

    return this.http.post(this.url, body);
  }

  public deleteForm(id: number) {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }

  private getBody(id: number, valueForChange: string): bodyForms {
    return {
      "form_field_values": [
        {
          "form_field_id": id,
          "value": valueForChange
        }
      ]
    };
  }
}
