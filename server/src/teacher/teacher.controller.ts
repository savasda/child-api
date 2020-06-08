import { Controller, Post, Body, UseGuards, ValidationPipe, UseInterceptors, UploadedFile, Logger, Get, Param, Res, Delete, Query, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDTO } from './models/teacher.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from  'multer';
import { TeacherEntity } from 'shared/entities/teacher.entity';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

 

  @Get()
  async getAll() {
    return this.teacherService.getAll();
  }

  @Get(':id')
  async getOne(@Param() data: {id}) {
    return await this.teacherService.getById(data.id);
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
  @ApiOkResponse({ description: 'Update teacher' })
  @ApiUnauthorizedResponse()
  @Put(':id')
  @UseGuards(new AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() data: Partial<TeacherDTO>,
  ) {
    return await this.teacherService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Add program' })
  @ApiUnauthorizedResponse()
  @Post('/bound/:id')
  @UseGuards(new AuthGuard())
  async boundPrograms(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: {programsIds: string[]}) {

    return await this.teacherService.boundTeacherWithPrograms(data.programsIds, id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Delete program' })
  @ApiUnauthorizedResponse()
  @Post('/unbound/:id')
  @UseGuards(new AuthGuard())
  async unboundPrograms(
    @Param('id') id: string,
    @Body(new ValidationPipe()) data: {programsIds: string[]}) {

    return await this.teacherService.unboundTeacherFromProgram(data.programsIds, id);
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

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Teacher deleted' })
  @ApiUnauthorizedResponse()
  @Delete(':id')
  @UseGuards(new AuthGuard())
  async delete(@Param() data: {id}) {
    return await this.teacherService.delete(data.id);
  }
}
