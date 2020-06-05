import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert } from "typeorm";
import { type } from "os";
import { ProgramEntity } from "./program.entity";
import { IsNotEmpty } from "class-validator";
import { Logger } from "@nestjs/common";

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  occupation: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  image: string;

  @ManyToMany(
    type => ProgramEntity,
    program => program.teachers
  )
  programs?: ProgramEntity[];

  imageFullpath: string


  buildAvatarPath() {
    this.imageFullpath = process.env.HOST_URL + this.image;
  }

}