import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from '../shared/entities/teacher.entity';
import { Repository, In } from 'typeorm';
import { ProgramEntity } from '../shared/entities/program.entity';
import {getRepository} from "typeorm";
import { distinctByProperty } from 'shared/utils';
import { PagedRO } from 'shared/entities/paged.ro';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(ProgramEntity) private programsReposetory: Repository<ProgramEntity>,
    @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>) {
  }

  async getAll(take, skip): Promise<PagedRO<TeacherEntity>> {
    try {
      const [data, total] = await this.teacherRepository.findAndCount({
        take,
        skip,
        relations: ['programs']
      });
      return new PagedRO(data, total);

    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  async getById(id: string):Promise<TeacherEntity> {
    try {
      const user = await this.teacherRepository.findOne({
        where: {id},
        relations: ['programs']
      });
      if(!user) throw new HttpException('User doesen`t exist', HttpStatus.BAD_REQUEST)
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(teacherData: unknown): Promise<TeacherEntity> {
    try {
      const teacher = this.teacherRepository.create(teacherData);
      return await this.teacherRepository.save(teacher);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


  async update(id: string, data: Partial<TeacherEntity>): Promise<TeacherEntity> {
    try {
      await this.teacherRepository.update({id}, data);
      return await this.teacherRepository.findOne({where: {id}});
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }


  async delete(id: string) : Promise<TeacherEntity>{
    try {
      const teacher =  await this.teacherRepository.findOne({where: {id}});
      await this.teacherRepository.remove(teacher);
      return teacher;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }


  async boundTeacherWithPrograms(programsIds: string[], id: string): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOne({
      where: {id},
      relations: ['programs']
    });
    const programs = await this.programsReposetory.find({
      where: {id: In(programsIds)}
    });
    if(!teacher) throw new HttpException(`Teacher with ${id} doesn't exist`, HttpStatus.BAD_REQUEST);
    teacher.programs = distinctByProperty([...teacher.programs, ...programs], 'id');
    return await this.teacherRepository.save(teacher);
  }

  async unboundTeacherFromProgram(programsIds: string[], id: string): Promise<TeacherEntity> {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: {id},
        relations: ['programs']
      });
  
      programsIds.forEach(id => {
        teacher.programs = teacher.programs.filter(program => program.id !== id);
      })
  
      return await this.teacherRepository.save(teacher);
    } catch(err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
 

}
