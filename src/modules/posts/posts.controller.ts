import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { Roles } from '../../core/decorator/roles.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    console.log('id: ', typeof id);

    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles('member')
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
