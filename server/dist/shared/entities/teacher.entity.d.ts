import { ProgramEntity } from "./program.entity";
export declare class TeacherEntity {
    id: string;
    name: string;
    occupation: string;
    description: string;
    image: string;
    created: Date;
    updated: Date;
    programs?: ProgramEntity[];
    imageFullpath: string;
    buildAvatarPath(): void;
}
