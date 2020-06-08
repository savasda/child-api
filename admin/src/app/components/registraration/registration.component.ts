import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {
  form: FormGroup;
  
  constructor(
    private router: Router,
    private notify: NzNotificationService,
    private authService: AuthenticationService,
    private _fb: FormBuilder) {}

  registerUser() {
    if(this.form.valid) {
      this.authService.register(this.form.value).subscribe(user => {
        this.notify.success( `Helollo ${user.username}`, 'your account succesfuly registerred');
        this.router.navigate(['welcome'])
      })
    }
  }

  ngOnInit() {
    this.form = this._fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
}