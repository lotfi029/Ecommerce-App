import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endWith, map, Observable } from 'rxjs';
import { IProduct } from '../../models/iproduct';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private _httpClient: HttpClient,
    private _loginService: LoginService
  ) {}
  // getMethod
  getAllProduct(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${environment.baseUrl}/products`, {
      // headers: new HttpHeaders({
      //   "authorization": this._loginService.getCurrentToken() ?? '',
      // }),
    });
  }
  getAllIds(): Observable<string[]> {
    return this._httpClient
      .get<IProduct[]>(`${environment.baseUrl}/products`)
      .pipe(map((res) => res.map((ids) => ids.id)));
  }
  getProductById(id: string): Observable<IProduct> {

    let idParam = new HttpParams().append('id', id);
    return this._httpClient.get<IProduct>(
      `${environment.baseUrl}/products/`, {
        // params: new HttpParams().set('id', id)
        params: idParam
        
      }
    );
  }
  getProductByCatId(catId: number): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(
      `${environment.baseUrl}/products?catId=${catId}`
    );
  }
  addNewProduct(model: IProduct): Observable<IProduct> {
    let modeltosave = JSON.stringify(model);
    return this._httpClient.post<IProduct>(
      `${environment.baseUrl}/products`,
      modeltosave
    );
  }
  updateProduct(id: string, model: IProduct): Observable<IProduct> {
    
    return this._httpClient.put<IProduct>(
      `${environment.baseUrl}/products/${id}`,
      JSON.stringify(model)
    );
  }
  delete(id: string): Observable<IProduct> {
    return this._httpClient.delete<IProduct>(
      `${environment.baseUrl}/products/${id}`
    );
  }
}
