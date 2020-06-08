import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from '../shared/entities/program.entity';
import { TeacherEntity } from '../shared/entities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity, TeacherEntity])
  ],
  controllers: [ProgramController],
  providers: [ProgramService]
})
export class ProgramModule {}
