import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient) {}

  addItems(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/items', data);
  }

  updateItems(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/items/${id}`, data);
  }

  getItemList(): Observable<any>{
    return this._http.get('http://localhost:3000/items');
  }

  deleteItems(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/items/${id}`);
  }
}
