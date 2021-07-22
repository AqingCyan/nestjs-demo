import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { DemoMiddleware } from './core/middleawre/demo.middleware';
import { APP_GUARD } from '@nestjs/core';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DemoRolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(DemoMiddleware).forRoutes('posts'); // 全局使用中间件，且只给posts路由使用
  }
}
