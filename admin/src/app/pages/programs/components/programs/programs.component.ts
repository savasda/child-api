import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ModalAddProgram } from '../modal-add-program/modal-add-program.component';
import { switchMap, map, filter, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ProgramsService } from 'src/app/services/programs.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {
  programs: any;
  loading: boolean;

 constructor(
   private storeService: StoreService,
   private programService: ProgramsService,
   private modalService: NzModalService) {}

  ngOnInit(): void {
   this.getPrograms();
  }
  onDelete(program) {
    console.log(program.id)
    this.programService.delete(program.id).pipe(
      switchMap(() => this.programService.getAll())
    ).subscribe(programs => this.storeService.setPrograms(programs))
  }

  onQueryParamsChange(e) {
    console.log(e)
  }

  getPrograms(pageData?: {take: number, skip: number} ) {
    this.loading = true;
    this.programService.getAll().pipe(take(1)).subscribe(pr => {
      this.programs = pr;
      this.loading = false;
    });
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
            }, err => new Error(err), () => modalRef.close())
        }
      }]
    });
    
    
  }

}
