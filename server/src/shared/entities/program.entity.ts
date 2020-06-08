import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

  @Column()
  image: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  duration: number;

  @ManyToMany(
    type => TeacherEntity,
    teacher => teacher.programs
  )
  @JoinTable()
  teachers: TeacherEntity[]

}