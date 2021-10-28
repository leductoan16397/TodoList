import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    aud: string;
    auth_time: number;
    'cognito:username': string;
    email: string;
    email_verified: boolean;
    event_id: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    origin_jti: string;
    phone_number: string;
    phone_number_verified: boolean;
    sub: string;
    token_use: string;
  };
}
@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: RequestWithUser) {
    const { user } = req;
    return this.todoService.create(createTodoDto, user.sub);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.todoService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: RequestWithUser,
  ) {
    const { user } = req;

    return this.todoService.update(id, user.sub, updateTodoDto);
  }

  @Put(':id')
  update2(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: RequestWithUser,
  ) {
    const { user } = req;
    return this.todoService.update(id, user.sub, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const { user } = req;
    return this.todoService.remove(id, user.sub);
  }
}
