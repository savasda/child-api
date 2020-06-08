import { TeacherEntity } from '../shared/entities/teacher.entity';
import { Repository } from 'typeorm';
import { ProgramEntity } from '../shared/entities/program.entity';
export declare class TeacherService {
    private programsReposetory;
    private teacherRepository;
    constructor(programsReposetory: Repository<ProgramEntity>, teacherRepository: Repository<TeacherEntity>);
    getAll(): Promise<TeacherEntity[]>;
    getById(id: string): Promise<TeacherEntity>;
    create(teacherData: unknown): Promise<TeacherEntity>;
    update(id: string, data: Partial<TeacherEntity>): Promise<TeacherEntity>;
    delete(id: string): Promise<TeacherEntity>;
    boundTeacherWithPrograms(programsIds: string[], id: string): Promise<TeacherEntity>;
    unboundTeacherFromProgram(programsIds: string[], id: string): Promise<TeacherEntity>;
}
