import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ModalAddProgram } from '../modal-add-program/modal-add-program.component';
import { switchMap, map, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ProgramsService } from 'src/app/services/programs.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {
  programs$ = this.storeService.getPrograms();

 constructor(
   private storeService: StoreService,
   private programService: ProgramsService,
   private modalService: NzModalService) {}

  ngOnInit(): void {
   
  }

  onAddNewProgram() {
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: 'Создать программу',
      nzContent: ModalAddProgram,
      nzFooter: [{
        type: 'primary',
        label: 'Создать',
        onClick: () => {
          this.programService.create(modalRef.getContentComponent().form.value)
            .pipe(switchMap(() => this.programService.getAll()))
            .subscribe(programs => {
              this.storeService.setPrograms(programs);
              console.log(programs)
            }, err => new Error(err), () => modalRef.close())
        }
      }]
    });
    
    
  }

}
