import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { type } from "os";
import { TeacherEntity } from "./teacher.entity";

@Entity('program')
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;

  @Column()
  description: string;

  @ManyToMany(
    type => TeacherEntity,
    teacher => teacher.programs,
    { eager: true }
  )
  @JoinTable()
  teachers: TeacherEntity[]

}