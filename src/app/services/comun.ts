import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicioComun {
  public networkConnected = true;
  private subject = new Subject<{ key: string, value: any }>();
  public data: [{ key: string, value: any }] = [{ key: '', value: '' }];

  constructor() {
  }

  // Set a key/value item
  async set(key: string, value: any): Promise<any> {
    localStorage.setItem(key, value);
    return value;
  }

  // Get a key/value item
  async get(key: string): Promise<any> {
    const result = localStorage.getItem(key);
    return result;
  }

  // Set a key/value object
  async setObject(key: string, value: any): Promise<any> {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  // Get a key/value object
  async getObject(key: string): Promise<any> {
    const result = localStorage.getItem(key);
    if (result != null) {
      return JSON.parse(result);
    } else {
      return null;
    }
  }

  sendData(data: { key: string, value: any }) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

}
