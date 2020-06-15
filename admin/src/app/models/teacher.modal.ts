import { ProgramModel } from './program.model';

export class TeacherModel {
  id: string;
  name: string;
  occupation: string;
  description: string;
  image: string;
  created: Date;
  updated: Date;
  programs: ProgramModel[];
  imageFullpath: string
}