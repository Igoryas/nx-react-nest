import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';
import { TaskModel } from './models/task.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name)
    private readonly taskModel: Model<TaskModel>,
    private readonly userService: UsersService
  ) {}
  async createTask(userId, taskDto: TaskDto) {
    const task = await this.taskModel.create(taskDto);
    await this.userService.setTaskToCurrentUser(userId, task._id);
    return task;
  }

  async getAllTasks(tasksId) {
    return await this.taskModel.find().where('_id').in(tasksId).exec();
  }

  async getTask(tasks, id: string) {
    if (this.taskExistence(tasks, id)) {
      return await this.taskModel.findOne({ _id: id }).exec();
    }
  }

  async deleteTask(user, id) {
    if (this.taskExistence(user.tasks, id)) {
      await this.userService.deleteTaskToCurrentUser(user._id, id);
      return await this.taskModel.deleteOne({ _id: id }).exec();
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async updateTask(user, body) {
    if (this.taskExistence(user.tasks, body._id)) {
      return await this.taskModel.updateOne(body).exec();
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  private taskExistence(userTasks, taskId) {
    return userTasks.find((id) => taskId === id.toString());
  }
}
