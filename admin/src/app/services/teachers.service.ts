import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginateModel } from '../models/paginate.modal';
import { Observable } from 'rxjs';
import { ResponseModal } from '../models/response.modal';
import { TeacherModel } from '../models/teacher.modal';
import { Program } from '../models/program.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private env = environment;

  constructor(private http: HttpClient){}

  get(data: PaginateModel): Observable<ResponseModal<TeacherModel>> {
    const params = new HttpParams()
      .set('skip', data.skip)
      .set('take', data.take)
      

      return this.http.get<Array<Program>>(`${this.env.api_host}/teacher`, {params})
        .pipe(map((programs: any) => {
          programs.data.forEach(element => {
            element.image = `${this.env.api_host}/${element.image}`
          });
          return programs;
        }))
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.env.api_host}/teacher/${id}`)
  }
}