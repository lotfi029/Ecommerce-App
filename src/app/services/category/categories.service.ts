import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}
  getAll(): Observable<ICategory[]> {
    return this._httpClient.get<ICategory[]>(
      `${environment.baseUrl}/categories`
    );
  }
  getById(id: number): Observable<ICategory> {
    return this._httpClient.get<ICategory>(
      `${environment.baseUrl}/categories/${id}`
    );
  }
}
