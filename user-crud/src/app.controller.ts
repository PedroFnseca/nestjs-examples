import {
  Controller,
  Get,
  Logger,
  Post, Body,
  Delete,
  Param,
  Response,
  Put
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user.type'

interface UserIdParam {
  id: number
}

@Controller('users')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers() {
    this.logger.log('GET / called');
    return this.appService.getUsers();
  }

  @Get(':id')
  getOneUser(
    @Param() userId: UserIdParam,
  ) {
    const { id } = userId

    this.logger.log(`GET /${id} called`)

    return this.appService.getOneUser(id)
  }

  @Post()
  insertUser(
    @Body('user') dataNewuser: User,
    @Response() res: any
  ) {
    this.logger.log('POST / called');

    if (!dataNewuser) {
      return res.status(400).send('No user provided')
    }

    this.appService.insertUser(dataNewuser);

    res.status(200).send("User inserted successfully")
  }

  @Delete(':id')
  deleteUser(
    @Param() userId: UserIdParam,
    @Response() res: any
  ) {
    this.logger.log('DELETE / called')

    const { id } = userId

    if (!id) {
      return res.status(400).send('No id provided')
    }

    this.appService.deleteUser(id)

    res.status(200).send("User deleted successfully")
  }

  @Put(':id')
  updateUser(
    @Param() userId: UserIdParam,
    @Response() res: any,
    @Body('user') dataNewUser: User
  ) {
    this.logger.log('PUT / called')

    const { id } = userId

    if (!id) {
      return res.status(400).send('No id provided')
    }

    this.appService.updateUser(id, dataNewUser)

    res.status(200).send('User updated successfully')
  }
}