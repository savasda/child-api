import { TeacherService } from './teacher.service';
import { TeacherDTO } from './models/teacher.dto';
import { TeacherEntity } from 'shared/entities/teacher.entity';
export declare class TeacherController {
    private teacherService;
    constructor(teacherService: TeacherService);
    getAll(): Promise<TeacherEntity[]>;
    getOne(data: {
        id: any;
    }): Promise<TeacherEntity>;
    create(teacher: TeacherDTO): Promise<TeacherEntity>;
    update(id: string, data: Partial<TeacherDTO>): Promise<TeacherEntity>;
    boundPrograms(id: string, data: {
        programsIds: string[];
    }): Promise<TeacherEntity>;
    unboundPrograms(id: string, data: {
        programsIds: string[];
    }): Promise<TeacherEntity>;
    uloadavatar(file: any): Promise<{
        path: any;
    }>;
    delete(data: {
        id: any;
    }): Promise<TeacherEntity>;
}
