import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgramModel } from '../models/program.model';
import { TeacherModel } from '../models/teacher.modal';

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private programs = new BehaviorSubject<Array<ProgramModel>>(null);
  private teachers = new BehaviorSubject<Array<TeacherModel>>(null);

  setPrograms(programs: Array<ProgramModel>) {
    this.programs.next(programs)
  }
  setTeachers(teachers: Array<TeacherModel>) {
    this.teachers.next(teachers);
  }
  getPrograms(): Observable<any> {
    return this.programs.asObservable();
  }
  getTeachers(): Observable<Array<TeacherModel>> {
    return this.teachers.asObservable();
  }
}