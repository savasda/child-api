import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'modal-add-program',
  templateUrl: './modal-add-program.component.html',
  styleUrls: ['./modal-add-program.component.less']
})
export class ModalAddProgram {
  private env = environment;
  url = `${this.env.api_host}/program/avatar`

  constructor(private http: HttpClient) {}

  previewFile = (file: UploadFile) => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(`${this.env.api_host}/program/avatar`, {
        method: 'POST',
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };
}