import { ProgramEntity } from '../shared/entities/program.entity';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../shared/entities/teacher.entity';
import { ProgramDTO } from './models/program.dto';
export declare class ProgramService {
    private programsReposetory;
    private teacherRepository;
    constructor(programsReposetory: Repository<ProgramEntity>, teacherRepository: Repository<TeacherEntity>);
    getAll(): Promise<ProgramEntity[]>;
    getById(id: string): Promise<ProgramEntity>;
    create(programData: ProgramDTO): Promise<ProgramEntity>;
    update(id: string, data: Partial<ProgramDTO>): Promise<ProgramEntity>;
    delete(id: string): Promise<ProgramEntity>;
}
