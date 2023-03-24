import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getData(key: string): unknown {
    const data = localStorage.getItem(key) ?? '';
    if (data) {
      return JSON.parse(data);
    }
    return;
  }

  public setData(key: string, value: unknown): void {
    const valueToStr = JSON.stringify(value);
    localStorage.setItem(key, valueToStr);
  }

  public clearData(): void {
    localStorage.clear();
  }
}