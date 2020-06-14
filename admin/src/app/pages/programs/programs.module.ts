import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs.routing.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProgramsComponent } from './programs/programs.component';
import { ModalAddProgram } from './modal-add-program/modal-add-program.component';
import { ModalEditProgramComponent } from './modal-edit-program/modal-edit-program.component';

@NgModule({
  declarations: [ProgramsComponent, ModalAddProgram, ModalEditProgramComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    NzUploadModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    ReactiveFormsModule,
    NzIconModule
  ], 
  entryComponents: [ModalAddProgram, ModalEditProgramComponent]
})
export class ProgramsModule { }
