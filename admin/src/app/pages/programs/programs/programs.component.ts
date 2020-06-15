import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { ModalAddProgram } from '../modal-add-program/modal-add-program.component';
import { switchMap, map, filter, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ProgramsService } from 'src/app/services/programs.service';
import { StoreService } from 'src/app/services/store.service';
import { PaginateModel, PaginatorInterface } from 'src/app/models/paginate.modal';
import { ModalEditProgramComponent } from '../modal-edit-program/modal-edit-program.component';

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
    this.getPrograms(new PaginateModel());
  }

  onDelete(program) {
    this.programService.delete(program.id).subscribe(() => this.getPrograms(new PaginateModel()))
  }

  onQueryParamsChange(params:PaginatorInterface) {
    if(params.pageIndex === 0) return;
    this.getPrograms(new PaginateModel(params));
  }

  getPrograms(pageData: PaginateModel ) {
    this.loading = true;
    this.programService.getAll(pageData).pipe(take(1)).subscribe(pr => {
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
            .pipe(switchMap(() => this.programService.getAll(new PaginateModel())))
            .subscribe(() => {
              this.getPrograms(new PaginateModel())
            }, err => new Error(err), () => modalRef.close())
        }
      }]
    });
  }

  onEditProgram(program) {
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: 'Редактировать программу',
      nzContent: ModalEditProgramComponent,
      nzFooter: [{
        type: 'primary',
        label: 'Создать',
        onClick: () => {
          // this.programService.create(modalRef.getContentComponent().form.value)
          //   .pipe(switchMap(() => this.programService.getAll(new PaginateModel())))
          //   .subscribe(programs => {
          //     this.storeService.setPrograms(programs);
          //   }, err => new Error(err), () => modalRef.close())
        }
      }]
    });
  }

}
