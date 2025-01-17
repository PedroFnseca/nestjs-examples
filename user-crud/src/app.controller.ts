import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  Delete,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user.type';

interface UserIdParam {
  id: number;
}

@Controller('users')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  async getUsers() {
    this.logger.log('GET / called');
    return await this.appService.getUsers();
  }

  @Get(':id')
  async getOneUser(@Param() { id }: UserIdParam) {
    this.logger.log(`GET /${id} called`);
    if (!id) {
      throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
    }
    return await this.appService.getOneUser(id);
  }

  @Post()
  async insertUser(@Body() newUser: User) {
    this.logger.log('POST / called');
    if (!newUser) {
      throw new HttpException('No user provided', HttpStatus.BAD_REQUEST);
    }
    const createdUser = await this.appService.insertUser(newUser);
    return { message: 'User inserted successfully', data: createdUser };
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: UserIdParam) {
    this.logger.log(`DELETE /${id} called`);
    if (!id) {
      throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
    }
    const deletedUser = await this.appService.deleteUser(id);
    return { message: 'User deleted successfully', data: deletedUser };
  }

  @Put(':id')
  async updateUser(@Param() { id }: UserIdParam, @Body() updatedUser: Partial<User>) {
    this.logger.log(`PUT /${id} called`);
    if (!id) {
      throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
    }
    const user = await this.appService.updateUser(id, updatedUser);
    return { message: 'User updated successfully', data: user };
  }
}