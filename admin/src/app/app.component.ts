import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/auth.service';
import { ProgramsService } from './services/programs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private programService: ProgramsService,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit(): void {
    this.authenticationService.whoami().subscribe(user => {
      console.log(user)
    })
  }
}
