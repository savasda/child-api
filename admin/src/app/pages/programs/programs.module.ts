import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramsRoutingModule } from './programs.routing.module';
import { ModalAddProgram } from './components/modal-add-program/modal-add-program.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ProgramsComponent, ModalAddProgram],
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
  entryComponents: [ModalAddProgram]
})
export class ProgramsModule { }
