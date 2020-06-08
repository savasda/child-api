import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form" nz-form>
      <nz-form-item>
      <nz-form-label [nzSpan]="5">Login</nz-form-label>
      <nz-form-control nzHasFeedback [nzSpan]="19" nzErrorTip="Input is required">
        <input formControlName="username" nz-input name="required" required />
      </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Password</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="19" nzErrorTip="Input is required">
          <input formControlName="password" nz-input name="required" required />
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
})
export class ModalAutorize implements OnInit {
  form: FormGroup;
  
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.form = this._fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
}