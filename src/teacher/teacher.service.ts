import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from 'shared/entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(TeacherEntity) private teacherRepository: Repository<TeacherEntity>) {
  }

  async getAll() {
    try {
      return await (await this.teacherRepository.find());
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
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


}
