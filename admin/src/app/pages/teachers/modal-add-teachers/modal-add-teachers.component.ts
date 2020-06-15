import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProgramsService } from 'src/app/services/programs.service';
import { ProgramModel } from 'src/app/models/program.model';
import { PaginateModel } from 'src/app/models/paginate.modal';
import { TeacherModel } from 'src/app/models/teacher.modal';
import { TeacherCreateModel } from 'src/app/models/teacher-create.model';

@Component({
  selector: 'app-modal-add-teachers',
  templateUrl: './modal-add-teachers.component.html',
  styleUrls: ['./modal-add-teachers.component.less']
})
export class ModalAddTeachersComponent implements OnInit, OnChanges {
  private env = environment;
  @Input() teacher: TeacherModel;
  url = `${this.env.api_host}/teacher/avatar`;
  form: FormGroup;
  programs: Array<ProgramModel>;

  constructor(private fb: FormBuilder,  private programsService: ProgramsService) { }

  ngOnInit(): void {
    this.initForm(this.teacher);
    this.getPrograms();
  }

  ngOnChanges() {
  }

  getPrograms() {
    this.programsService.getAll(new PaginateModel({pageIndex: 0,  pageSize: 99999})).subscribe(pr => {
      this.programs = pr.data.map(el => {
        el.checked === false;
        if(this.teacher?.programs?.length) {
          const pr = this.teacher.programs.find(inner => inner.id === el.id);
          if(pr) el.checked = true;
        }
        return el;
      });
    })
  }

  getCheckedPrograms(): Array<string> {
    return this.programs.filter(pr => pr.checked === true).map(el => el.id);
  }

  initForm(teacher: TeacherCreateModel): void {
    this.form = this.fb.group({
      name: [{value: teacher ? teacher.name : null, disabled: teacher ? false : true}, Validators.required],
      occupation: [{value: teacher ? teacher.occupation : null, disabled: teacher ? false : true}, Validators.required],
      description: [{value: teacher ? teacher.description : null, disabled: teacher ? false : true}, Validators.required],
      image: [teacher ? teacher.image : null, [Validators.required]],
    })
    
    
  }

  handleChange(evt) {
    if(evt.file.status == 'done') {
      this.form.patchValue({image: evt.file.response.path}, {emitEvent: false});
      for(const key in this.form.controls) {
        this.form.controls[key].enable()
      }
    }
  }

}
