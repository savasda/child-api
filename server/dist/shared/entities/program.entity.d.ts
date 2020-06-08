import { TeacherEntity } from "./teacher.entity";
export declare class ProgramEntity {
    id: string;
    caption: string;
    description: string;
    image: string;
    created: Date;
    updated: Date;
    duration: number;
    teachers: TeacherEntity[];
}
