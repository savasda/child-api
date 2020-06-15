import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';
import { PaginateModel } from 'src/app/models/paginate.modal';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnDestroy {
  programsQuantity: number;
  unsubscribe = new Subject();
  teachers = this.teacherService.get(new PaginateModel());
  programs = this.programsService.getAll(new PaginateModel());

  constructor(
    private router: Router,
    private programsService: ProgramsService,
    private teacherService: TeachersService) { }


  onNavigateToPrograms() {
    this.router.navigate(['programs'])
  }
  onNavigateToTeachers() {
    this.router.navigate(['teachers'])
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

}
