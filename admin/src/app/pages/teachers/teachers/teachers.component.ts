import { Component, OnInit } from '@angular/core';
import { PaginatorInterface, PaginateModel } from 'src/app/models/paginate.modal';
import { TeachersService } from 'src/app/services/teachers.service';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent implements OnInit {
  teachers: any;
  loading: boolean;

  constructor(private teacherService: TeachersService) { }

  ngOnInit(): void {
    this.getTeachers(new PaginateModel())
  }

  getTeachers(model: PaginateModel) {
    this.loading = true
    this.teacherService.get(model).pipe(take(1)).subscribe(data => {
      this.teachers = data;
      this.loading = false;
    });
  }

  onAddNewTeacher() {

  }

  onEditTeacher(teacher) {

  }

  onDeleteTeacher(teacher) {
    this.teacherService.delete(teacher.id).pipe(
      switchMap(() => this.teacherService.get(new PaginateModel())))
      .subscribe(teachers => this.teachers = teachers)

  }

  onQueryParamsChange(params: PaginatorInterface) {

  }

}
