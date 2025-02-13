import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../../models/icourse';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private _httpClient: HttpClient) {

  }
  getAllCourses() : Observable<ICourse[]> {
    return this._httpClient.get<ICourse[]>(`https://localhost:7208/api/Course/GetAll`)
  }
}
