import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increaseCounter } from '../../store/counter/counter.action';
import { ICourse } from '../../models/icourse';
import { EducationService } from '../../services/education/education.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  counter: Observable<number>;
  count!: number;
  courses: ICourse[];
  constructor(
    private store: Store<{ counter: number }>,
    private _courseService: EducationService
  ) {
    this.counter = this.store.select('counter');
    this.counter.subscribe((newVal) => {
      this.count = newVal;
    })
    this.courses = [] as ICourse[]
  }
  ngOnInit() {
    this._courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res;
        
      }
    })
    
  }
  counterPlus() {
    this.store.dispatch(increaseCounter())
  }
}
 