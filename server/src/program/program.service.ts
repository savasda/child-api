import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from '../shared/entities/program.entity';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../shared/entities/teacher.entity';
import { ProgramDTO } from './models/program.dto';
import { PagedRO } from 'shared/entities/paged.ro';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity) private programsReposetory: Repository<ProgramEntity>,
    @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>) {
  }

  async getAll(take: number, skip: number): Promise<PagedRO<ProgramEntity>>
  {
    try {
      const [data, total] = await this.programsReposetory.findAndCount({take, skip});
      return new PagedRO(data, total);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getById(id: string): Promise<ProgramEntity> {
    try {
      const program = await this.programsReposetory.findOne({
        where: {id},
        relations: ['teachers']
      });
      if(!program) throw new HttpException("Program doesn't exist", HttpStatus.BAD_REQUEST);
      return program;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(programData: ProgramDTO) : Promise<ProgramEntity>{
    try {
      let program = await this.programsReposetory.findOne({where: {caption: programData.caption}})
      if(program) throw new HttpException('Program alredy exist', HttpStatus.BAD_REQUEST);
      program = await this.programsReposetory.create(programData);
      await this.programsReposetory.save(program);
      return program;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: Partial<ProgramDTO>): Promise<ProgramEntity> {
    try {
      await this.programsReposetory.update({id}, data);
      return await this.programsReposetory.findOne({where: {id}});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<ProgramEntity> {
    try {
      const program = await this.programsReposetory.findOne({where: {id}});
      await this.programsReposetory.remove(program);
      return program;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
