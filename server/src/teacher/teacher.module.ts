import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from '../shared/entities/teacher.entity';
import { ProgramEntity } from '../shared/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, ProgramEntity])],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
