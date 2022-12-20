import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDto } from './dto/task.dto';
import { UsersService } from '../users/users.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTask(@Req() req, @Body() tasksDto: TaskDto) {
    return await this.tasksService.createTask(req.user._id, tasksDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTasks(@Req() req) {
    return await this.tasksService.getAllTasks(req.user.tasks);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getTask(@Req() req, @Param('id') id) {
    return await this.tasksService.getTask(req.user.tasks, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteTask(@Req() req, @Body() body) {
    return await this.tasksService.deleteTask(req.user, body.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateTask(@Req() req, @Body() body) {
    return await this.tasksService.updateTask(req.user, body);
  }
}
