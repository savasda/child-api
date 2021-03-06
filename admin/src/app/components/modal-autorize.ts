import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';

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
      <div (click)="registerUser()" class="register-user-link">
        <a>Register new user?</a>
      </div>
    </form>
  `,
  styles: [`
    .register-user-link {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ModalAutorize implements OnInit {
  form: FormGroup;
  
  constructor(
    private _modalRef: NzModalRef,
    private _router: Router,
    private _fb: FormBuilder) {}

  registerUser() {
    this._router.navigate(['/registration']);
    this._modalRef.close();
  }

  ngOnInit() {
    this.form = this._fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
}