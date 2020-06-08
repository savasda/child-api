import { Get, Param, Res, Controller } from "@nestjs/common";

@Controller()
export class AppController {
  
  @Get('/static/avatars/teachers/:fileId')
  async teacherAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'static/avatars/teachers'});
  }

  @Get('/static/avatars/programs/:fileId')
  async program(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'static/avatars/teachers'});
  }

}