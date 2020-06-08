import { Controller, Get, Param, Post, Body, UsePipes, UseGuards, UseInterceptors, UploadedFile, Put, Delete } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramEntity } from '../shared/entities/program.entity';
import { ProgramDTO } from './models/program.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from  'multer';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService){}

  @Get()
  async allPrograms(): Promise<ProgramEntity[]> {
    return await this.programService.getAll()
  }

  @Get(':id')
  async oneProgram(@Param() data: {id}): Promise<ProgramEntity> {
    return await this.programService.getById(data.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update program' })
  @ApiUnauthorizedResponse()
  @Put(':id')
  @UseGuards(new AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() data: Partial<ProgramDTO>,
  ) {
    return await this.programService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create program' })
  @ApiUnauthorizedResponse()
  @Post()
  @UseGuards(new AuthGuard())
  async create(@Body() program: ProgramDTO){
    return await this.programService.create(program);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Create program' })
  @ApiUnauthorizedResponse()
  @Delete('id')
  @UseGuards(new AuthGuard())
  async delete(@Param('id') id: string){
    return await this.programService.delete(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Upload teacher avatar' })
  @ApiUnauthorizedResponse()
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/avatars/programs', 
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