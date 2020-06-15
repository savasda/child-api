import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpExceptionFilter } from './shared/http-error.filter';
import { TeacherModule } from './teacher/teacher.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { ProgramModule } from './program/program.module';
import { PagerMiddleware } from './shared/middlewares/pager.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    MulterModule.register({
      dest: './files',
    }),
    UserModule, TeacherModule, ProgramModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware)
    .forRoutes(
      { path: 'program', method: RequestMethod.GET }
    )
  }
}
