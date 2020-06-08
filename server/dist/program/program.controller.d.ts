import { ProgramService } from './program.service';
import { ProgramEntity } from '../shared/entities/program.entity';
import { ProgramDTO } from './models/program.dto';
export declare class ProgramController {
    private programService;
    constructor(programService: ProgramService);
    allPrograms(): Promise<ProgramEntity[]>;
    oneProgram(data: {
        id: any;
    }): Promise<ProgramEntity>;
    update(id: string, data: Partial<ProgramDTO>): Promise<ProgramEntity>;
    create(program: ProgramDTO): Promise<ProgramEntity>;
    delete(id: string): Promise<ProgramEntity>;
    uloadavatar(file: any): Promise<{
        path: any;
    }>;
}
