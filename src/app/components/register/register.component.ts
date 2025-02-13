import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userRegistrationForm: FormGroup;

  constructor(private _fromBuilder: FormBuilder) {
    this.userRegistrationForm = _fromBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      address: _fromBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
      phoneNumbers: _fromBuilder.array([_fromBuilder.control('')])
    });
  }
  // constructor() {
  //   this.userRegistrationForm = new FormGroup({
  //     name: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z]{3,15}$'),
  //     ]),
  //     email: new FormControl('',[Validators.required, Validators.email]),
  //     password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  //     address: new FormGroup({
  //       city: new FormControl('', [Validators.required]),
  //       street: new FormControl('', [Validators.required]),
  //     }),
  //     phoneNumbers: new FormArray([new FormControl('')])
  //   });
  // }
  get name() {
    return this.userRegistrationForm.get('name');
  }
  get email() {
    return this.userRegistrationForm.get('email');
  }
  get password() {
    return this.userRegistrationForm.get('password');
  }
  get city() {
    return this.userRegistrationForm.get('address')?.get('city');
  }
  get street() {
    return this.userRegistrationForm.get('address')?.get('street');
  }
  get phones() {
    return this.userRegistrationForm.get('phoneNumbers') as FormArray;
  }
  addphoneNumber() {
    this.phones.push(this._fromBuilder.control(''));
  }
  addProduct() {
    console.log(this.userRegistrationForm.value);
  }
}
