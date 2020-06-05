import { Controller, Post, Body, UseGuards, ValidationPipe, UseInterceptors, UploadedFile, Logger, Get, Param, Res } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDTO } from './models/teacher.dto';
import { AuthGuard } from 'shared/guards/auth.guard';
import { ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from  'multer';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

 

  @Get()
  async getAll() {
    return this.teacherService.getAll();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create teacher' })
  @ApiUnauthorizedResponse()
  @Post()
  @UseGuards(new AuthGuard())
  async create(@Body(new ValidationPipe()) teacher: TeacherDTO) {
    return await this.teacherService.create(teacher);
  }
  

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Upload teacher avatar' })
  @ApiUnauthorizedResponse()
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/avatars/teachers', 
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }),
  )
  async uloadavatar(@UploadedFile() file) {
    return {path: file.path.replace(/\\/g, '/')};
  }
}
