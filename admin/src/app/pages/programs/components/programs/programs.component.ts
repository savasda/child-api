import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ModalAddProgram } from '../modal-add-program/modal-add-program.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {

 constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
   
  }

  onAddNewProgram() {
    this.modalService.create({
      nzTitle: 'Создать программу',
      nzContent: ModalAddProgram
    })
  }

}
