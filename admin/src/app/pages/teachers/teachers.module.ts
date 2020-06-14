import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers/teachers.component';
import { ModalAddTeachersComponent } from './modal-add-teachers/modal-add-teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [TeachersComponent, ModalAddTeachersComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    NzUploadModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    ReactiveFormsModule,
    NzIconModule
  ]
})
export class TeachersModule { }
