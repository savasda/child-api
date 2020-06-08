import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private env = environment;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.env.api_host}/program`)
  }
}
