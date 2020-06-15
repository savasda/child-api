import { TeacherModel } from './teacher.modal';

export class ProgramModel {
  id: string;
  caption: string;
  created: Date;
  description: string;
  duration: string;
  image: string;
  teachers: [TeacherModel]
  updated: string;
  checked?: boolean;
}