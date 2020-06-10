import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'modal-add-program',
  templateUrl: './modal-add-program.component.html',
  styleUrls: ['./modal-add-program.component.less']
})
export class ModalAddProgram implements OnInit{
  private env = environment;
  url = `${this.env.api_host}/program/avatar`;
  form: FormGroup;
  private isDisabledFields = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {}


  ngOnInit() {
    this.initForm();
  }

  previewFile = (file: UploadFile) => {
    return this.http
      .post<{ thumbnail: string }>(`${this.env.api_host}/program/avatar`, {
        method: 'POST',
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };

  initForm() {
    this.form = this.fb.group({
      caption: [{value: null, disabled: true}, Validators.required],
      description: [{value: null, disabled: true}, Validators.required],
      duration: [{value: 45, disabled: true}, Validators.required],
      image: [null, Validators.required],
    })
  }

  createTeacher() {
    console.log(this.form.value)
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