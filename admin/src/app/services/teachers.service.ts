import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginateModel } from '../models/paginate.modal';
import { Observable } from 'rxjs';
import { ResponseModal } from '../models/response.modal';
import { TeacherModel } from '../models/teacher.modal';
import { ProgramModel } from '../models/program.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TeacherCreateModel } from '../models/teacher-create.model';

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
      

      return this.http.get<Array<ProgramModel>>(`${this.env.api_host}/teacher`, {params})
        .pipe(map((programs: any) => {
          programs.data.forEach(element => {
            element.image = `${this.env.api_host}/${element.image}`
          });
          return programs;
        }))
  }

  bound(teacherId: string, programsIds: Array<string>) {
    return this.http.post(`${this.env.api_host}/teacher/bound/${teacherId}`, {programsIds})
  }

  create(teacher: TeacherCreateModel): Observable<TeacherModel> {
    return this.http.post<TeacherModel>(`${this.env.api_host}/teacher`, teacher)
  }


  delete(id: string): Observable<any> {
    return this.http.delete(`${this.env.api_host}/teacher/${id}`)
  }
}