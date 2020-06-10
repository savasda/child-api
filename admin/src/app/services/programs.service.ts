import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';
import { take, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private env = environment;
  constructor(
    private httpClient: HttpClient,
    private storeService: StoreService){
      this.getAll().pipe(take(1)).subscribe(data => this.storeService.setPrograms(data))
    }

    getAll(): Observable<Array<Program>> {
      return this.httpClient.get<Array<Program>>(`${this.env.api_host}/program`)
        .pipe(map((programs: any) => {
          return programs.map(program => {
            program.image = `${this.env.api_host}/${program.image}`;
            return program;
          })
        }))
    }

    create(data: any): Observable<any> {
      return this.httpClient.post<Array<Program>>(`${this.env.api_host}/program`, data)
    }

}