import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/services/teachers.service';
import { PaginateModel } from 'src/app/models/paginate.modal';
import { take } from 'rxjs/operators';
import { ResponseModal } from 'src/app/models/response.modal';
import { TeacherModel } from 'src/app/models/teacher.modal';

@Component({
  selector: 'modal-edit-program',
  templateUrl: './modal-edit-program.component.html',
  styleUrls: ['./modal-edit-program.component.less']
})
export class ModalEditProgramComponent implements OnInit {
  teachers: ResponseModal<TeacherModel>
  constructor(private teachersService: TeachersService) {}

  ngOnInit() {
    this.getTeachers(new PaginateModel())
  }

  private getTeachers(data: PaginateModel) {
    this.teachersService.get(data).pipe(take(1)).subscribe(data => this.teachers = data);
  }

}