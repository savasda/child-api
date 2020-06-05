import { Controller, Get, Query, Param, UseGuards, Post, UsePipes, ValidationPipe, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "shared/guards/auth.guard";
import { User } from "shared/decorators/user.decorator";
import { UserDTO, UserRO } from "./models/user.dto";
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from "@nestjs/swagger";

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('users/:username')
  showOneUser(@Param('username') username: string) {
    return this.userService.read(username);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get user info by his name' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: String })
  @Get('auth/whoami')
  @UseGuards(new AuthGuard())
  showMe(@User('username') username: string) {
    return this.userService.read(username);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: UserDTO) {
    return await this.userService.register(data);
  }

}