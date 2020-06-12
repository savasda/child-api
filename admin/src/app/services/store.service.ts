import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Program } from '../models/program.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private programs = new BehaviorSubject<Array<Program>>(null);
  private teachers = new BehaviorSubject<Array<Teacher>>(null);

  setPrograms(programs: Array<Program>) {
    this.programs.next(programs)
  }
  setTeachers(teachers: Array<Teacher>) {
    this.teachers.next(teachers);
  }
  getPrograms(): Observable<any> {
    return this.programs.asObservable();
  }
  getTeachers(): Observable<Array<Teacher>> {
    return this.teachers.asObservable();
  }
}