import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  constructor(private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {
    this.authenticationService.whoami().subscribe(user => {
      console.log(user)
    })
  }
}
