import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';
import { take, map, tap } from 'rxjs/operators';
import { PaginateModel } from '../models/paginate.modal';
@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private env = environment;
  constructor(
    private httpClient: HttpClient,
    private storeService: StoreService){
      this.getAll(new PaginateModel()).pipe(take(1)).subscribe(data => this.storeService.setPrograms(data))
    }

    getAll(pageData: PaginateModel): Observable<Array<Program>> {
      const params = new HttpParams()
      .set('skip', pageData.skip)
      .set('take', pageData.take)
      

      return this.httpClient.get<Array<Program>>(`${this.env.api_host}/program`, {params})
        .pipe(map((programs: any) => {
          programs.data.forEach(element => {
            element.image = `${this.env.api_host}/${element.image}`
          });
          return programs;
        }))
    }

    create(data: any): Observable<any> {
      return this.httpClient.post<Array<Program>>(`${this.env.api_host}/program`, data)
    }

    delete(id: string) : Observable<any> {
      return this.httpClient.delete(`${this.env.api_host}/program/${id}`)
    }

}