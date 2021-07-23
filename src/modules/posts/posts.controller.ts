import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { Roles } from '../../core/decorator/roles.decorator';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { User } from '../../core/decorator/user.decorator';
import { DemoPipe } from '../../core/pipes/demo.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    // ParseIntPipe 管道转换类型
    console.log('id: ', typeof id);

    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles('member')
  store(@Body() post: CreatePostDto, @User('demo', DemoPipe) user) {
    console.log(user);
    this.demoService.create(post);
  }
}
