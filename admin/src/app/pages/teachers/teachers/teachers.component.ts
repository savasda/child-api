import { Component, OnInit } from '@angular/core';
import { PaginatorInterface, PaginateModel } from 'src/app/models/paginate.modal';
import { TeachersService } from 'src/app/services/teachers.service';
import { take, switchMap } from 'rxjs/operators';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ModalAddTeachersComponent } from '../modal-add-teachers/modal-add-teachers.component';
import { ProgramsService } from 'src/app/services/programs.service';
import { TeacherCreateModel } from 'src/app/models/teacher-create.model';
import { ModalEditTeacherComponent } from '../modal-edit-teacher/modal-edit-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent implements OnInit {
  teachers: any;
  loading: boolean;

  constructor(
   
    private modalSerice: NzModalService,
    private teacherService: TeachersService) { }

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
    const modelRef = this.modalSerice.create({
      nzTitle: 'Создать преподователя',
      nzContent: ModalAddTeachersComponent,
      nzWidth: 1024,
      nzFooter: [{
        type: 'primary',
        label: 'Создать',
        onClick: () => {
          if (modelRef.componentInstance.form.valid) {
            this.create(modelRef.componentInstance.form.value, modelRef)
          }
        },
      }]
    });

  }

  create(data: TeacherCreateModel, modelRef: NzModalRef<ModalAddTeachersComponent>) {
    console.log(data)
    this.teacherService.create(data)
      .pipe(switchMap((teacher) => {
        if(modelRef.componentInstance.getCheckedPrograms().length) return this.teacherService.bound(teacher.id, modelRef.componentInstance.getCheckedPrograms())
        else return []
      }))
      .subscribe(data => {
        this.getTeachers(new PaginateModel())
      }, err => console.log(err), () => modelRef.close())
  }

  onEditTeacher(teacher) {
    const modelRef = this.modalSerice.create({
      nzTitle: 'Редактировать преподователя',
      nzContent: ModalAddTeachersComponent,
      nzComponentParams: {teacher},
      nzWidth: 1024,
      nzFooter: [{
        type: 'primary',
        label: 'Создать',
        onClick: () => {
          // if (modelRef.componentInstance.form.valid) {
          //   this.create(modelRef.componentInstance.form.value, modelRef)
          // }
        },
      }]
    });

  }

  onDeleteTeacher(teacher) {
    this.teacherService.delete(teacher.id)
      .subscribe(() => this.getTeachers(new PaginateModel()))
  }

  onQueryParamsChange(params: PaginatorInterface) {

  }

}
