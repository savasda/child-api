import { UserService } from "./user.service";
import { UserDTO, UserRO } from "./models/user.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    showAllUsers(page: number): Promise<UserRO[]>;
    showOneUser(username: string): Promise<UserRO>;
    showMe(username: string): Promise<UserRO>;
    login(data: UserDTO): Promise<UserRO>;
    register(data: UserDTO): Promise<UserRO>;
}
