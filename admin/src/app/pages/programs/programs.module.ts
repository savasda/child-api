import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './programs.component';
import { ProgramsRoutingModule } from './programs.routing.module';



@NgModule({
  declarations: [ProgramsComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule
  ]
})
export class ProgramsModule { }
