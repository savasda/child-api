import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramsRoutingModule } from './programs.routing.module';
import { ModalAddProgram } from './components/modal-add-program/modal-add-program.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';



@NgModule({
  declarations: [ProgramsComponent, ModalAddProgram],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    NzUploadModule
  ], 
  entryComponents: [ModalAddProgram]
})
export class ProgramsModule { }
