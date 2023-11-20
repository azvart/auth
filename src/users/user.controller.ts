import {
  Controller,
  UseGuards,
  Get,
  Req,
  Patch,
  Body,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RequestWithUser } from '../types/types';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  public async getAllUsers() {
    return await this.user.getAllUsers();
  }
}
