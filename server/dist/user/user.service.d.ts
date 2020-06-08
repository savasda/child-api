import { Repository } from 'typeorm';
import { UserDTO } from './models/user.dto';
import { UserEntity } from '../shared/entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showAll(page?: number): Promise<import("./models/user.dto").UserRO[]>;
    read(username: string): Promise<import("./models/user.dto").UserRO>;
    login(data: UserDTO): Promise<import("./models/user.dto").UserRO>;
    register(data: UserDTO): Promise<import("./models/user.dto").UserRO>;
}
